package generator

import (
	"fmt"
	"github.com/golang/protobuf/ptypes/wrappers"
	mesh_proto "github.com/kumahq/kuma/api/mesh/v1alpha1"
	core_mesh "github.com/kumahq/kuma/pkg/core/resources/apis/mesh"
	model "github.com/kumahq/kuma/pkg/core/xds"
	xds_context "github.com/kumahq/kuma/pkg/xds/context"
	envoy_common "github.com/kumahq/kuma/pkg/xds/envoy"
	envoy_clusters "github.com/kumahq/kuma/pkg/xds/envoy/clusters"
	envoy_endpoints "github.com/kumahq/kuma/pkg/xds/envoy/endpoints"
	envoy_listeners "github.com/kumahq/kuma/pkg/xds/envoy/listeners"
	envoy_names "github.com/kumahq/kuma/pkg/xds/envoy/names"
	envoy_routes "github.com/kumahq/kuma/pkg/xds/envoy/routes"
	"google.golang.org/protobuf/types/known/durationpb"
	"sort"
	"time"
)

const (
	OriginGateway = "public-gateway"
)

var defaultRetryPolicy = core_mesh.RetryResource{
	Spec: &mesh_proto.Retry{
		Conf: &mesh_proto.Retry_Conf{
			Http: &mesh_proto.Retry_Conf_Http{
				NumRetries: &wrappers.UInt32Value{
					Value: 3,
				},
				// Required even if empty
				RetriableStatusCodes: []uint32{},
			},
		},
	},
}

var defaultCircuitBreaker = core_mesh.CircuitBreakerResource{
	Spec: &mesh_proto.CircuitBreaker{
		Conf: &mesh_proto.CircuitBreaker_Conf{
			Thresholds: &mesh_proto.CircuitBreaker_Conf_Thresholds{
				MaxConnections:     &wrappers.UInt32Value{Value: 1024},
				MaxPendingRequests: &wrappers.UInt32Value{Value: 1024},
				MaxRequests:        &wrappers.UInt32Value{Value: 1024},
				MaxRetries:         &wrappers.UInt32Value{Value: 3},
			},
			SplitExternalAndLocalErrors: true,
			BaseEjectionTime:            durationpb.New(120 * time.Second),
			MaxEjectionPercent:          &wrappers.UInt32Value{Value: 80},
			Detectors: &mesh_proto.CircuitBreaker_Conf_Detectors{
				LocalErrors: &mesh_proto.CircuitBreaker_Conf_Detectors_Errors{Consecutive: &wrappers.UInt32Value{Value: 5}},
				Failure: &mesh_proto.CircuitBreaker_Conf_Detectors_Failure{
					RequestVolume: &wrappers.UInt32Value{Value: 5},
					MinimumHosts:  &wrappers.UInt32Value{Value: 1},
					Threshold:     &wrappers.UInt32Value{Value: 85},
				},
			},
		},
	},
}

type PublicGatewayGenerator struct {
}

type Route struct {
	Mesh            string
	Service         string
	DeploymentGroup string
}

func (r Route) key() string {
	return r.DeploymentGroup
}

func (i PublicGatewayGenerator) Generate(ctx xds_context.Context, proxy *model.Proxy) (*model.ResourceSet, error) {
	resources := model.NewResourceSet()
	if proxy.Dataplane.GetMeta().GetMesh() != "default" {
		return resources, nil
	}
	if !proxy.Dataplane.Spec.IsPublicIngressGateway() {
		return resources, nil
	}

	destinationsPerService := i.destinations(proxy.Routing.TrafficRouteList)

	services := i.services(proxy)

	serviceRoutes := i.appRoutes(proxy)
	listener, err := i.generateLDS(ctx, proxy, serviceRoutes, proxy.APIVersion)
	if err != nil {
		return nil, err
	}
	resources.Add(&model.Resource{
		Name:     listener.GetName(),
		Origin:   OriginGateway,
		Resource: listener,
	})

	cdsResources, err := i.generateCDS(ctx, proxy, serviceRoutes, services, destinationsPerService, proxy.APIVersion)
	if err != nil {
		return nil, err
	}
	resources.Add(cdsResources...)

	edsResources, err := i.generateEDS(proxy, serviceRoutes, services, proxy.APIVersion)
	if err != nil {
		return nil, err
	}
	resources.Add(edsResources...)

	return resources, nil
}

// generateLDS generates one Ingress Listener
// Ingress Listener assumes that mTLS is on. Using TLSInspector we sniff SNI value.
// SNI value has service name and tag values specified with the following format: "backend{cluster=2,version=1}"
// We take all possible destinations from TrafficRoutes and generate FilterChainsMatcher for each unique destination.
// This approach has a limitation: additional tags on outbound in Universal mode won't work across different zones.
// Traffic is NOT decrypted here, therefore we don't need certificates and mTLS settings
func (i PublicGatewayGenerator) generateLDS(
	ctx xds_context.Context,
	proxy *model.Proxy,
	serviceRoutes map[string][]Route,
	apiVersion envoy_common.APIVersion,
) (envoy_common.NamedResource, error) {
	ingress := proxy.Dataplane
	inbound := ingress.Spec.Networking.Inbound[0]
	inboundListenerName := envoy_names.GetInboundListenerName(ingress.Spec.GetNetworking().GetAddress(), inbound.Port)
	var services []string
	for r := range serviceRoutes {
		services = append(services, r)
	}
	sort.Strings(services)

	virtualHostBuilder := envoy_routes.NewVirtualHostBuilder(apiVersion).
		Configure(envoy_routes.CommonVirtualHost(OriginGateway)).
		Configure(envoy_routes.ClusterHeader("", "X-KOYEB-ROUTE")).
		Configure(envoy_routes.StaticResponse("/health", 200, []byte("OK"))).
		Configure(envoy_routes.StaticResponse("", 502, []byte("No supported routes for this path")))

	return envoy_listeners.NewListenerBuilder(apiVersion).
		Configure(envoy_listeners.InboundListener(inboundListenerName, ingress.Spec.GetNetworking().GetAddress(), inbound.Port, model.SocketAddressProtocolTCP)).
		Configure(envoy_listeners.FilterChain(envoy_listeners.NewFilterChainBuilder(apiVersion).
			Configure(envoy_listeners.ServerSideMTLS(ctx, proxy.Metadata, true)).
			Configure(envoy_listeners.HttpConnectionManager(inboundListenerName, true)).
			Configure(envoy_listeners.HttpStaticRoute(
				envoy_routes.NewRouteConfigurationBuilder(apiVersion).
					Configure(envoy_routes.VirtualHost(virtualHostBuilder))),
			).
			Configure(envoy_listeners.Retry(&defaultRetryPolicy, core_mesh.ProtocolHTTP)).
			Configure(envoy_listeners.MaxConnectAttempts(&defaultRetryPolicy)))).
		Build()
}

func (_ PublicGatewayGenerator) destinations(trs *core_mesh.TrafficRouteResourceList) map[string][]envoy_common.Tags {
	destinations := map[string][]envoy_common.Tags{}
	for _, tr := range trs.Items {
		for _, split := range tr.Spec.Conf.Split {
			service := split.Destination[mesh_proto.ServiceTag]
			destinations[service] = append(destinations[service], split.Destination)
		}
	}
	return destinations
}

func (_ PublicGatewayGenerator) services(proxy *model.Proxy) []string {
	var services []string
	for service := range proxy.Routing.OutboundTargets {
		services = append(services, service)
	}
	sort.Strings(services)
	return services
}

func (i PublicGatewayGenerator) generateCDS(
	ctx xds_context.Context,
	proxy *model.Proxy,
	serviceRoutes map[string][]Route,
	services []string,
	destinationsPerService map[string][]envoy_common.Tags,
	apiVersion envoy_common.APIVersion,
) (resources []*model.Resource, _ error) {
	for _, service := range services {
		tagSlice := envoy_common.TagsSlice(append(destinationsPerService[service], destinationsPerService[mesh_proto.MatchAllTag]...))
		tagKeySlice := tagSlice.ToTagKeysSlice().Transform(envoy_common.Without(mesh_proto.ServiceTag), envoy_common.With("mesh"))
		for _, route := range serviceRoutes[service] {
			clusterName := fmt.Sprintf("%s_%s", service, route.DeploymentGroup)
			edsCluster, err := envoy_clusters.NewClusterBuilder(apiVersion).
				Configure(envoy_clusters.EdsCluster(clusterName)).
				Configure(envoy_clusters.CrossMeshClientSideMTLS(ctx, proxy.Metadata, route.Mesh)).
				Configure(envoy_clusters.LbSubset(tagKeySlice)).
				Configure(envoy_clusters.CircuitBreaker(&defaultCircuitBreaker)).
				Configure(envoy_clusters.OutlierDetection(&defaultCircuitBreaker)).
				Configure(envoy_clusters.Timeout(core_mesh.ProtocolTCP, &mesh_proto.Timeout_Conf{ConnectTimeout: durationpb.New(250 * time.Millisecond)})).
				Build()
			if err != nil {
				return nil, err
			}
			resources = append(resources, &model.Resource{
				Name:     clusterName,
				Origin:   OriginGateway,
				Resource: edsCluster,
			})
		}
	}
	return
}

func (_ PublicGatewayGenerator) generateEDS(
	proxy *model.Proxy,
	serviceRoutes map[string][]Route,
	services []string,
	apiVersion envoy_common.APIVersion,
) (resources []*model.Resource, err error) {
	for _, service := range services {
		endpoints := proxy.Routing.OutboundTargets[service]
		for _, route := range serviceRoutes[service] {
			clusterName := fmt.Sprintf("%s_%s", service, route.DeploymentGroup)
			cla, err := envoy_endpoints.CreateClusterLoadAssignment(clusterName, endpoints, apiVersion)
			if err != nil {
				return nil, err
			}
			resources = append(resources, &model.Resource{
				Name:     clusterName,
				Origin:   OriginGateway,
				Resource: cla,
			})
		}
	}
	return
}

func (i PublicGatewayGenerator) appRoutes(proxy *model.Proxy) (byService map[string][]Route) {
	ingress := proxy.Dataplane
	byService = map[string][]Route{}

	for _, inbound := range ingress.Spec.GetNetworking().GetIngress().GetAvailableServices() {
		service := inbound.Tags[mesh_proto.ServiceTag]
		// Used to restrict gateways to subsets of apps (Poor man sharding)
		gateway := inbound.Tags["koyeb.com/publicgateway"]
		if gateway != "" {
			if gateway != ingress.Spec.GetNetworking().GetInbound()[0].Tags["koyeb.com/publicgateway"] {
				continue
			}
		}
		deploymentGroup := inbound.Tags["koyeb.com/deploymentgroup"]
		if deploymentGroup == "" {
			deploymentGroup = "prod"
		}
		r := Route{
			Mesh:            inbound.Mesh,
			Service:         service,
			DeploymentGroup: deploymentGroup,
		}
		byService[service] = append(byService[service], r)
	}
	for n := range byService {
		// We put the longest names first
		sort.Slice(byService[n], func(i, j int) bool {
			return byService[n][i].DeploymentGroup < byService[n][j].DeploymentGroup
		})
	}
	return
}
