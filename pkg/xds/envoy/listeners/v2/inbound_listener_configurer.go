package v2

import (
	v2 "github.com/envoyproxy/go-control-plane/envoy/api/v2"
	envoy_core "github.com/envoyproxy/go-control-plane/envoy/api/v2/core"
	mesh_proto "github.com/kumahq/kuma/api/mesh/v1alpha1"
)

type InboundListenerConfigurer struct {
	ListenerName string
	Address      string
	Port         uint32
	Protocol     mesh_proto.SocketAddressProtocol
}

func (c *InboundListenerConfigurer) Configure(l *v2.Listener) error {
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
