package v3

import (
	envoy_core "github.com/envoyproxy/go-control-plane/envoy/config/core/v3"
	envoy_listener "github.com/envoyproxy/go-control-plane/envoy/config/listener/v3"
	envoy_dns "github.com/envoyproxy/go-control-plane/envoy/data/dns/v3"
	dns_filter "github.com/envoyproxy/go-control-plane/envoy/extensions/filters/udp/dns_filter/v3alpha"
	envoy_type_matcher "github.com/envoyproxy/go-control-plane/envoy/type/matcher/v3"
	mesh_proto "github.com/kumahq/kuma/api/mesh/v1alpha1"
	"github.com/kumahq/kuma/pkg/util/proto"
)

type DnsFilterConfigurer struct {
	Config *mesh_proto.DnsFilterConfig
}

var _ ListenerConfigurer = &DnsFilterConfigurer{}

func (c *DnsFilterConfigurer) Configure(l *envoy_listener.Listener) error {
	pbst, err := proto.MarshalAnyDeterministic(c.mapFilterConfig())
	if err != nil {
		return err
	}
	l.ListenerFilters = append(l.ListenerFilters, &envoy_listener.ListenerFilter{
		Name: "envoy.filters.udp.dns_filter",
		ConfigType: &envoy_listener.ListenerFilter_TypedConfig{
			TypedConfig: pbst,
		},
	})
	return nil
}

func (c *DnsFilterConfigurer) mapFilterConfig() *dns_filter.DnsFilterConfig {
	var virtualDomains []*envoy_dns.DnsTable_DnsVirtualDomain
	for _, v := range c.Config.VirtualDomains {
		virtualDomains = append(virtualDomains, &envoy_dns.DnsTable_DnsVirtualDomain{
			Name: v.Name,
			Endpoint: &envoy_dns.DnsTable_DnsEndpoint{
				EndpointConfig: &envoy_dns.DnsTable_DnsEndpoint_ClusterName{
					ClusterName: v.ClusterName,
				},
			},
		})
	}
	var suffixes []*envoy_type_matcher.StringMatcher
	for _, v := range c.Config.Suffixes {
		suffixes = append(suffixes, &envoy_type_matcher.StringMatcher{
			MatchPattern: &envoy_type_matcher.StringMatcher_Suffix{
				Suffix: v,
			},
		})
	}
	var upstreamResolvers []*envoy_core.Address
	for _, v := range c.Config.UpstreamResolvers {
		upstreamResolvers = append(upstreamResolvers, &envoy_core.Address{
			Address: &envoy_core.Address_SocketAddress{
				SocketAddress: &envoy_core.SocketAddress{
					Address: v.Address,
					PortSpecifier: &envoy_core.SocketAddress_PortValue{
						PortValue: v.Port,
					},
				},
			},
		})
	}
	return &dns_filter.DnsFilterConfig{
		StatPrefix: "dns_filter",
		ServerConfig: &dns_filter.DnsFilterConfig_ServerContextConfig{
			ConfigSource: &dns_filter.DnsFilterConfig_ServerContextConfig_InlineDnsTable{
				InlineDnsTable: &envoy_dns.DnsTable{
					VirtualDomains: virtualDomains,
					KnownSuffixes:  suffixes,
				},
			},
		},
		ClientConfig: &dns_filter.DnsFilterConfig_ClientContextConfig{
			UpstreamResolvers: upstreamResolvers,
			MaxPendingLookups: 256,
		},
	}
}
