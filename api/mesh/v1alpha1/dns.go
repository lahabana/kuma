package v1alpha1

type SocketAddressProtocol int32

const (
	TCP SocketAddressProtocol = 0
	UDP SocketAddressProtocol = 1
)

type DnsResolver struct {
	Address string
	Port    uint32
}

type VirtualDomain struct {
	Name        string
	ClusterName string
}

// TODO maybe this should just be a policy
type DnsFilterConfig struct {
	UpstreamResolvers []DnsResolver
	Suffixes          []string
	VirtualDomains    []VirtualDomain
}
