package tls

import (
	"fmt"
	core_xds "github.com/kumahq/kuma/pkg/core/xds"
	"io/ioutil"
	"os"
	"path"
)

const (
	MeshCaResource       = "mesh_ca"
	IdentityCertResource = "identity_cert"
	GatewayCertResource  = "koyeb_gateway_cert"
	GatewayCaResource    = "koyeb_gateway_ca"
	GatewayMesh          = "koyeb-gateway"
)

func MeshSpiffeIDPrefix(mesh string) string {
	return fmt.Sprintf("spiffe://%s/", mesh)
}

func ServiceSpiffeID(mesh string, service string) string {
	return fmt.Sprintf("spiffe://%s/%s", mesh, service)
}

func KumaID(tagName, tagValue string) string {
	return fmt.Sprintf("kuma://%s/%s", tagName, tagValue)
}
func GatewaySecretPath() string {
	return os.Getenv("KOYEB_GATEWAY_SECRET_PATH")
}

func ReadGatewaySecrets() (*core_xds.IdentitySecret, *core_xds.CaSecret, error) {
	certPath := GatewaySecretPath()
	if certPath == "" {
		return nil, nil, nil
	}
	certPem, err := ioutil.ReadFile(path.Join(certPath, "gateway.pem"))
	if err != nil {
		return nil, nil, err
	}
	keyPem, err := ioutil.ReadFile(path.Join(certPath, "gateway-key.pem"))
	if err != nil {
		return nil, nil, err
	}
	caPem, err := ioutil.ReadFile(path.Join(certPath, "ca.pem"))
	if err != nil {
		return nil, nil, err
	}

	return &core_xds.IdentitySecret{
			PemCerts: [][]byte{certPem},
			PemKey:   keyPem,
		}, &core_xds.CaSecret{
			PemCerts: [][]byte{caPem},
		}, nil
}
