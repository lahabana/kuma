package v2

import (
	"bytes"

	envoy_auth "github.com/envoyproxy/go-control-plane/envoy/api/v2/auth"
	envoy_core "github.com/envoyproxy/go-control-plane/envoy/api/v2/core"

	core_xds "github.com/kumahq/kuma/pkg/core/xds"
)

func CreateIdentitySecret(name string, secret *core_xds.IdentitySecret) *envoy_auth.Secret {
	return &envoy_auth.Secret{
		Name: name,
		Type: &envoy_auth.Secret_TlsCertificate{
			TlsCertificate: &envoy_auth.TlsCertificate{
				CertificateChain: &envoy_core.DataSource{
					Specifier: &envoy_core.DataSource_InlineBytes{
						InlineBytes: bytes.Join(secret.PemCerts, []byte("\n")),
					},
				},
				PrivateKey: &envoy_core.DataSource{
					Specifier: &envoy_core.DataSource_InlineBytes{
						InlineBytes: secret.PemKey,
					},
				},
			},
		},
	}
}
