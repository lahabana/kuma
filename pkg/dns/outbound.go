package dns

import (
	"fmt"
	util_net "github.com/kumahq/kuma/pkg/util/net"
	"sort"
	"strconv"
	"strings"

	"github.com/asaskevich/govalidator"

	"github.com/kumahq/kuma/pkg/core"

	"github.com/kumahq/kuma/pkg/core/resources/model"

	"github.com/pkg/errors"

	"github.com/kumahq/kuma/pkg/dns/vips"

	mesh_proto "github.com/kumahq/kuma/api/mesh/v1alpha1"
	core_mesh "github.com/kumahq/kuma/pkg/core/resources/apis/mesh"
)

var dnsOutboundGeneratorLog = core.Log.WithName("dns-outbound-generator")

const VIPListenPort = uint32(80)

func VIPOutbounds(
	resourceKey model.ResourceKey,
	dataplanes []*core_mesh.DataplaneResource,
	vips vips.List,
	externalServices []*core_mesh.ExternalServiceResource,
	defaultDomain string,
) []*mesh_proto.Dataplane_Networking_Outbound {
	type vipEntry struct {
		ip       string
		port     uint32
		hostname string
	}
	serviceVIPMap := map[string]vipEntry{}
	services := []string{}
	for _, dataplane := range dataplanes {
		if dataplane.Spec.IsIngress() {
			for _, service := range dataplane.Spec.Networking.Ingress.AvailableServices {
				if service.Mesh == resourceKey.Mesh {
					// Only add outbounds for services in the same mesh
					inService := service.Tags[mesh_proto.ServiceTag]
					if _, found := serviceVIPMap[inService]; !found {
						vip, err := ForwardLookup(vips, inService)
						if err == nil {
							serviceVIPMap[inService] = vipEntry{vip, VIPListenPort, fmt.Sprintf("%s.%s", inService, defaultDomain)}
							services = append(services, inService)
						}
					}
				}
			}
		} else {
			for _, inbound := range dataplane.Spec.Networking.Inbound {
				inService := inbound.GetTags()[mesh_proto.ServiceTag]
				if _, found := serviceVIPMap[inService]; !found {
					vip, err := ForwardLookup(vips, inService)
					if err == nil {
						serviceVIPMap[inService] = vipEntry{vip, VIPListenPort, fmt.Sprintf("%s.%s", inService, defaultDomain)}
						services = append(services, inService)
					}
				}
			}
		}
	}

	for _, externalService := range externalServices {
		inService := externalService.Spec.Tags[mesh_proto.ServiceTag]
		if _, found := serviceVIPMap[inService]; !found {
			vip, err := ForwardLookup(vips, inService)
			if err == nil {
				port := externalService.Spec.GetPort()
				var p32 uint32
				if p64, err := strconv.ParseUint(port, 10, 32); err != nil {
					p32 = VIPListenPort
				} else {
					p32 = uint32(p64)
				}
				hostname := fmt.Sprintf("%s.%s", inService, defaultDomain)
				if govalidator.IsDNSName(externalService.Spec.GetHost()) {
					hostname = externalService.Spec.GetHost()
				}
				serviceVIPMap[inService] = vipEntry{vip, p32, hostname}
				services = append(services, inService)
			}
		}
	}

	sort.Strings(services)
	outbounds := []*mesh_proto.Dataplane_Networking_Outbound{}
	for _, service := range services {
		entry := serviceVIPMap[service]
		outbounds = append(outbounds, &mesh_proto.Dataplane_Networking_Outbound{
			Address:  entry.ip,
			Hostname: entry.hostname,
			Port:     entry.port,
			Tags:     map[string]string{mesh_proto.ServiceTag: service},
		})

		// todo (lobkovilya): backwards compatibility, could be deleted in the next major release Kuma 1.2.x
		if entry.port != VIPListenPort {
			outbounds = append(outbounds, &mesh_proto.Dataplane_Networking_Outbound{
				Address:  entry.ip,
				Hostname: entry.hostname,
				Port:     VIPListenPort,
				Tags:     map[string]string{mesh_proto.ServiceTag: service},
			})
		}
	}

	return outbounds
}

func ForwardLookup(vips vips.List, service string) (string, error) {
	ip, found := vips[service]
	if !found {
		return "", errors.Errorf("service [%s] not found", service)
	}
	return ip, nil
}

func VirtualOutbounds(
	resourceKey model.ResourceKey,
	dataplanes []*core_mesh.DataplaneResource,
	externalServices []*core_mesh.ExternalServiceResource,
	virtualOutbounds []*core_mesh.VirtualOutboundResource,
	cidr string,
) ([]*mesh_proto.Dataplane_Networking_Outbound, error) {
	var tagSets []map[string]string
	var self *core_mesh.DataplaneResource
	for _, dataplane := range dataplanes {
		if model.MetaToResourceKey(dataplane.Meta) == resourceKey {
			self = dataplane
		}
		if dataplane.Spec.IsIngress() {
			for _, inbound := range dataplane.Spec.Networking.Ingress.AvailableServices {
				if inbound.Mesh == resourceKey.Mesh {
					tagSets = append(tagSets, inbound.Tags)
				}
			}
		} else {
			for _, inbound := range dataplane.Spec.Networking.Inbound {
				tagSets = append(tagSets, inbound.Tags)
			}
		}
	}
	for _, externalService := range externalServices {
		tagSets = append(tagSets, externalService.Spec.Tags)
	}

	ipam, err := NewSimpleIPAM(cidr)
	if err != nil {
		return nil, err
	}
	cidrIsV4 := util_net.CidrIsIpV4(cidr)
	ipByHostname := map[string]string{}
	if self != nil {
		// Retrieve existing ips from self to not change already assigned ips
		for _, outbound := range self.Spec.Networking.Outbound {
			if outbound.Hostname != "" && (!cidrIsV4 || util_net.IsV4(outbound.Address)) { // If we have a v4 cidr we only match things for v4
				err := ipam.ReserveIP(outbound.Address)
				if err != nil && !IsAddressAlreadyAllocated(err) && !IsAddressOutsideCidr(err) {
					return nil, errors.Wrapf(err, "Failed reserving ip: %s", outbound.Address)
				}
				ipByHostname[outbound.Hostname] = outbound.Address
			}
		}
	}

	outbounds := buildOutbounds(tagSets, virtualOutbounds)
	var outboundWithv6 []*mesh_proto.Dataplane_Networking_Outbound
	for _, outbound := range outbounds {
		if _, ok := ipByHostname[outbound.Hostname]; !ok {
			// Allocate ip for hostname
			ip, err := ipam.AllocateIP()
			ipByHostname[outbound.Hostname] = ip
			if err != nil {
				return nil, errors.Wrapf(err, "Failed allocating ip")
			}
		}
		// Set the address for the hostname
		outbound.Address = ipByHostname[outbound.Hostname]
		outboundWithv6 = append(outboundWithv6, outbound)
		// Add a v6 listener is the ip wasn't v6
		if cidrIsV4 {
			outboundWithv6 = append(outboundWithv6, &mesh_proto.Dataplane_Networking_Outbound{
				Tags:     outbound.Tags,
				Port:     outbound.Port,
				Hostname: outbound.Hostname,
				Address:  util_net.ToV6(outbound.Address),
			})
		}
	}
	return outboundWithv6, nil
}

func buildOutbounds(tagSets []map[string]string, policies []*core_mesh.VirtualOutboundResource) []*mesh_proto.Dataplane_Networking_Outbound {
	uniqueHostPort := map[string]*scoredOutbound{}
	for _, tagSet := range tagSets {
		for _, curPolicy := range policies {
			var bestRank *mesh_proto.TagSelectorRank
			if len(curPolicy.Selectors()) == 0 {
				bestRank = &mesh_proto.TagSelectorRank{}
			} else {
				for _, selector := range curPolicy.Selectors() {
					if len(selector.Match) == 0 {
						bestRank = &mesh_proto.TagSelectorRank{}
					} else {
						tagSelector := mesh_proto.TagSelector(selector.Match)
						if tagSelector.Matches(tagSet) {
							r := tagSelector.Rank()
							if bestRank == nil || r.CompareTo(*bestRank) > 0 {
								bestRank = &r
							}
						}
					}
				}
			}
			if bestRank != nil {
				r, err := newScoredOutbound(tagSet, *bestRank, curPolicy)
				if err != nil {
					dnsOutboundGeneratorLog.Error(err, "failed generating outbound", "tagSet", tagSet, "policy", curPolicy.GetMeta().GetName())
				} else {
					hostPort := r.HostPort()
					cur := uniqueHostPort[hostPort]
					if cur == nil || cur.Less(r) {
						uniqueHostPort[hostPort] = r
					}
				}
			}
		}
	}
	rankedOutbounds := make([]*scoredOutbound, 0, len(uniqueHostPort))
	for _, v := range uniqueHostPort {
		rankedOutbounds = append(rankedOutbounds, v)
	}
	sort.SliceStable(rankedOutbounds, func(i, j int) bool {
		return rankedOutbounds[i].Less(rankedOutbounds[j])
	})

	res := make([]*mesh_proto.Dataplane_Networking_Outbound, len(rankedOutbounds))
	for i := range rankedOutbounds {
		res[i] = rankedOutbounds[i].outbound
	}
	return res
}

type scoredOutbound struct {
	tagSets  map[string]string
	rank     mesh_proto.TagSelectorRank
	policy   *core_mesh.VirtualOutboundResource
	outbound *mesh_proto.Dataplane_Networking_Outbound
}

// Key returns a unique key for this tagSet and policy (ToOutbound call of 2 items with the same key will return the same result).
func (s *scoredOutbound) Key() string {
	var tags []string
	for k, v := range s.outbound.Tags {
		tags = append(tags, fmt.Sprintf("%s=%s", k, v))
	}
	sort.Strings(tags)
	return fmt.Sprintf("%s{%s}", s.policy.Meta.GetName(), strings.Join(tags, ","))
}

func (s *scoredOutbound) HostPort() string {
	return fmt.Sprintf("%s:%d", s.outbound.Hostname, s.outbound.Port)
}

// Less by match inverse quality, then key
func (s *scoredOutbound) Less(other *scoredOutbound) bool {
	r := s.rank.CompareTo(other.rank)
	if r == 0 {
		if s.Key() == other.Key() {
			return s.HostPort() < other.HostPort()
		}
		return s.Key() < other.Key()
	}
	return r < 0
}

func newScoredOutbound(tagSet map[string]string, rank mesh_proto.TagSelectorRank, policy *core_mesh.VirtualOutboundResource) (*scoredOutbound, error) {
	s := &scoredOutbound{
		tagSets: tagSet,
		rank:    rank,
		policy:  policy,
	}
	host, err := s.policy.EvalHost(s.tagSets)
	if err != nil {
		return nil, err
	}
	port, err := s.policy.EvalPort(s.tagSets)
	if err != nil {
		return nil, err
	}
	s.outbound = &mesh_proto.Dataplane_Networking_Outbound{
		Port:     port,
		Hostname: host,
		Tags:     s.policy.FilterTags(s.tagSets),
	}
	return s, nil
}
