package generator

import (
	"fmt"
	envoy_routes "github.com/kumahq/kuma/pkg/xds/envoy/routes"
	"github.com/kumahq/kuma/pkg/xds/envoy/tls"
	"sort"

	mesh_proto "github.com/kumahq/kuma/api/mesh/v1alpha1"
	core_mesh "github.com/kumahq/kuma/pkg/core/resources/apis/mesh"
	model "github.com/kumahq/kuma/pkg/core/xds"
	xds_context "github.com/kumahq/kuma/pkg/xds/context"
	envoy_common "github.com/kumahq/kuma/pkg/xds/envoy"
	envoy_clusters "github.com/kumahq/kuma/pkg/xds/envoy/clusters"
	envoy_endpoints "github.com/kumahq/kuma/pkg/xds/envoy/endpoints"
	envoy_listeners "github.com/kumahq/kuma/pkg/xds/envoy/listeners"
	envoy_names "github.com/kumahq/kuma/pkg/xds/envoy/names"
)

const (
	// OriginPublicIngress is a marker to indicate by which ProxyGenerator resources were generated.
	OriginPublicIngress = "public-ingress"
)

type IngressPublicGenerator struct {
}

func (i IngressPublicGenerator) Generate(ctx xds_context.Context, proxy *model.Proxy) (*model.ResourceSet, error) {
	resources := model.NewResourceSet()

	destinationsPerService := i.destinations(proxy.Routing.TrafficRouteList)

	listener, err := i.generateLDS(proxy.Dataplane, destinationsPerService, proxy.APIVersion)
	if err != nil {
		return nil, err
	}
	resources.Add(&model.Resource{
		Name:     listener.GetName(),
		Origin:   OriginPublicIngress,
		Resource: listener,
	})

	services := i.services(proxy)

	cdsResources, err := i.generateCDS(ctx, proxy, services, destinationsPerService, proxy.APIVersion)
	if err != nil {
		return nil, err
	}
	resources.Add(cdsResources...)

	edsResources, err := i.generateEDS(proxy, services, proxy.APIVersion)
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
func (i IngressPublicGenerator) generateLDS(
	ingress *core_mesh.DataplaneResource,
	destinationsPerService map[string][]envoy_common.Tags,
	apiVersion envoy_common.APIVersion,
) (envoy_common.NamedResource, error) {
	inbound := ingress.Spec.Networking.Inbound[0]
	// TODO the port is hacked together probably should do something more flexible
	inboundListenerName := envoy_names.GetInboundListenerName(ingress.Spec.GetNetworking().GetAddress(), inbound.Port+1)

	virtualHostBuilder := envoy_routes.NewVirtualHostBuilder(apiVersion).
		Configure(envoy_routes.CommonVirtualHost(OriginPublicIngress))

	sniUsed := map[string]bool{}
	for _, inbound := range ingress.Spec.GetNetworking().GetIngress().GetAvailableServices() {
		service := inbound.Tags[mesh_proto.ServiceTag]
		destinations := destinationsPerService[service]
		destinations = append(destinations, destinationsPerService[mesh_proto.MatchAllTag]...)

		for _, destination := range destinations {
			meshDestination := destination.
				WithTags(mesh_proto.ServiceTag, service).
				WithTags("mesh", inbound.GetMesh())

			sni := tls.SNIFromTags(meshDestination)
			if sniUsed[sni] {
				continue
			}
			sniUsed[sni] = true
			virtualHostBuilder.Configure(envoy_routes.Route(fmt.Sprintf("/%s/%s", inbound.GetMesh(), service), "/", envoy_common.ClusterSubset{
				ClusterName: name(service),
				Tags:        meshDestination.WithoutTag(mesh_proto.ServiceTag),
			}, false))
		}
	}

	return envoy_listeners.NewListenerBuilder(apiVersion).
		Configure(envoy_listeners.InboundListener(inboundListenerName, ingress.Spec.GetNetworking().GetAddress(), inbound.Port+1)).
		Configure(envoy_listeners.FilterChain(envoy_listeners.NewFilterChainBuilder(apiVersion).
			Configure(envoy_listeners.HttpConnectionManager(inboundListenerName)).
			Configure(envoy_listeners.HttpStaticRoute(envoy_routes.NewRouteConfigurationBuilder(apiVersion).
				Configure(envoy_routes.VirtualHost(virtualHostBuilder)))))).
		Build()
}

func (_ IngressPublicGenerator) destinations(trs *core_mesh.TrafficRouteResourceList) map[string][]envoy_common.Tags {
	destinations := map[string][]envoy_common.Tags{}
	for _, tr := range trs.Items {
		for _, split := range tr.Spec.Conf.Split {
			service := split.Destination[mesh_proto.ServiceTag]
			destinations[service] = append(destinations[service], split.Destination)
		}
	}
	return destinations
}

func (_ IngressPublicGenerator) services(proxy *model.Proxy) []string {
	var services []string
	for service := range proxy.Routing.OutboundTargets {
		services = append(services, service)
	}
	sort.Strings(services)
	return services
}

func (i IngressPublicGenerator) generateCDS(
	ctx xds_context.Context, proxy *model.Proxy,
	services []string,
	destinationsPerService map[string][]envoy_common.Tags,
	apiVersion envoy_common.APIVersion,
) (resources []*model.Resource, _ error) {
	for _, service := range services {
		edsCluster, err := envoy_clusters.NewClusterBuilder(apiVersion).
			Configure(envoy_clusters.EdsCluster(name(service))).
			Configure(envoy_clusters.ClientSideMTLS(ctx, proxy.Metadata, service, destinationsPerService[service])).
			Configure(envoy_clusters.LbSubset(i.lbSubsets(service, destinationsPerService))).
			Build()
		if err != nil {
			return nil, err
		}
		resources = append(resources, &model.Resource{
			Name:     name(service),
			Origin:   OriginPublicIngress,
			Resource: edsCluster,
		})
	}
	return
}

func name(svc string) string {
	return "in:" + svc
}

func (_ IngressPublicGenerator) lbSubsets(service string, destinationsPerService map[string][]envoy_common.Tags) [][]string {
	selectors := [][]string{}
	destinations := destinationsPerService[service]
	destinations = append(destinations, destinationsPerService[mesh_proto.MatchAllTag]...)

	for _, destination := range destinations {
		keys := append(destination.WithoutTag(mesh_proto.ServiceTag).Keys(), "mesh")
		selectors = append(selectors, keys)
	}
	return selectors
}

func (_ IngressPublicGenerator) generateEDS(
	proxy *model.Proxy,
	services []string,
	apiVersion envoy_common.APIVersion,
) (resources []*model.Resource, err error) {
	for _, service := range services {
		endpoints := proxy.Routing.OutboundTargets[service]
		cla, err := envoy_endpoints.CreateClusterLoadAssignment(name(service), endpoints, apiVersion)
		if err != nil {
			return nil, err
		}
		resources = append(resources, &model.Resource{
			Name:     name(service),
			Origin:   OriginPublicIngress,
			Resource: cla,
		})
	}
	return
}
