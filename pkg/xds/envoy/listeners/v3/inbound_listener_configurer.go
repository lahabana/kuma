package v3

import (
	envoy_core "github.com/envoyproxy/go-control-plane/envoy/config/core/v3"
	envoy_listener "github.com/envoyproxy/go-control-plane/envoy/config/listener/v3"
	mesh_proto "github.com/kumahq/kuma/api/mesh/v1alpha1"
)

type InboundListenerConfigurer struct {
	ListenerName string
	Address      string
	Port         uint32
	Protocol     mesh_proto.SocketAddressProtocol
}

func (c *InboundListenerConfigurer) Configure(l *envoy_listener.Listener) error {
	l.Name = c.ListenerName
	l.TrafficDirection = envoy_core.TrafficDirection_INBOUND
	l.Address = &envoy_core.Address{
		Address: &envoy_core.Address_SocketAddress{
			SocketAddress: &envoy_core.SocketAddress{
				Protocol: envoy_core.SocketAddress_Protocol(c.Protocol),
				Address:  c.Address,
				PortSpecifier: &envoy_core.SocketAddress_PortValue{
					PortValue: c.Port,
				},
			},
		},
	}
	l.ReusePort = c.Protocol == mesh_proto.UDP
	// notice that filter chain configuration is left up to other configurers

	return nil
}
