package generator

import (
	kuma_mesh "github.com/kumahq/kuma/api/mesh/v1alpha1"
	mesh_proto "github.com/kumahq/kuma/api/mesh/v1alpha1"
	"github.com/kumahq/kuma/pkg/core"
	mesh_core "github.com/kumahq/kuma/pkg/core/resources/apis/mesh"
	model "github.com/kumahq/kuma/pkg/core/xds"
	xds_context "github.com/kumahq/kuma/pkg/xds/context"
	envoy_common "github.com/kumahq/kuma/pkg/xds/envoy"
	envoy_listeners "github.com/kumahq/kuma/pkg/xds/envoy/listeners"
	"github.com/kumahq/kuma/pkg/xds/envoy/names"
	"github.com/pkg/errors"
)

var dnsGenerator = core.Log.WithName("dns-proxy-generator")

type DnsProxyGenerator struct {
}

func (g DnsProxyGenerator) Generate(ctx xds_context.Context, proxy *model.Proxy) (*model.ResourceSet, error) {
	outbounds := proxy.Dataplane.Spec.Networking.GetOutbound()
	resources := model.NewResourceSet()

	dnsGenerator.Info("Generating dns config", "version", proxy.APIVersion)
	filterConfig := mesh_proto.DnsFilterConfig{
		Suffixes: []string{"mesh"}, // TODO this is a configuration in Kuma
		UpstreamResolvers: []mesh_proto.DnsResolver{ // TODO this is a configuration too
			{Address: "8.8.8.8", Port: 53},
		},
	}
	for _, outbound := range outbounds {
		tags := outbound.GetTagsIncludingLegacy()
		filterConfig.VirtualDomains = append(filterConfig.VirtualDomains, mesh_proto.VirtualDomain{
			Name:        tags[kuma_mesh.ServiceTag] + ".mesh",
			ClusterName: tags[kuma_mesh.ServiceTag],
		})
	}
	port := proxy.Dataplane.Spec.GetNetworking().GetTransparentProxying().GetRedirectPortOutbound()
	if port == 0 {
		// TODO make configurable
		port = 53
	}
	sourceService := proxy.Dataplane.Spec.GetIdentifyingService()
	meshName := ctx.Mesh.Resource.GetMeta().GetName()
	outboundListener, err := envoy_listeners.NewListenerBuilder(proxy.APIVersion).
		// TODO make configurable
		Configure(envoy_listeners.UdpOutboundListener(names.GetDnsListenerName(), "169.254.53.53", port)).
		Configure(envoy_listeners.DnsFilter(&filterConfig)).
		Configure(envoy_listeners.FilterChain(envoy_listeners.NewFilterChainBuilder(proxy.APIVersion).
			Configure(envoy_listeners.NetworkAccessLog(meshName, envoy_common.TrafficDirectionOutbound, sourceService, "external", proxy.Policies.Logs[mesh_core.DNSService], proxy)))).
		Build()
	if err != nil {
		return nil, errors.Wrapf(err, "could not generate listener: %s", outboundName)
	}

	resources.Add(&model.Resource{
		Name:     outboundListener.GetName(),
		Resource: outboundListener,
		Origin:   OriginInbound,
	})
	return resources, nil
}
