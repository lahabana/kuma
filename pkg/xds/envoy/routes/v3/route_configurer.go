package v3

import (
	envoy_core "github.com/envoyproxy/go-control-plane/envoy/config/core/v3"
	envoy_route "github.com/envoyproxy/go-control-plane/envoy/config/route/v3"
	envoy_type_matcher "github.com/envoyproxy/go-control-plane/envoy/type/matcher/v3"
	envoy_common "github.com/kumahq/kuma/pkg/xds/envoy"
	envoy_metadata "github.com/kumahq/kuma/pkg/xds/envoy/metadata/v3"
)

type RoutesConfigurer struct {
	MatchPath      string
	NewPath        string
	Cluster        envoy_common.Cluster
	AllowGetOnly   bool
	Headers        []envoy_common.HeaderMatch
	StaticResponse *envoy_common.StaticResponse
	ClusterHeader  string
}

func (c RoutesConfigurer) Configure(virtualHost *envoy_route.VirtualHost) error {
	var headersMatcher []*envoy_route.HeaderMatcher
	if c.AllowGetOnly {
		headersMatcher = []*envoy_route.HeaderMatcher{
			{
				Name: ":method",
				HeaderMatchSpecifier: &envoy_route.HeaderMatcher_ExactMatch{
					ExactMatch: "GET",
				},
			},
		}
	}
	for _, v := range c.Headers {
		matcher := &envoy_route.HeaderMatcher{
			Name: v.Header,
		}
		switch {
		case v.Present != nil:
			matcher.HeaderMatchSpecifier = &envoy_route.HeaderMatcher_PresentMatch{
				PresentMatch: *v.Present,
			}
		case v.ExactMatch != "":
			matcher.HeaderMatchSpecifier = &envoy_route.HeaderMatcher_ExactMatch{
				ExactMatch: v.ExactMatch,
			}
		case v.RegexMatch != "":
			matcher.HeaderMatchSpecifier = &envoy_route.HeaderMatcher_SafeRegexMatch{
				SafeRegexMatch: &envoy_type_matcher.RegexMatcher{
					EngineType: &envoy_type_matcher.RegexMatcher_GoogleRe2{
						GoogleRe2: &envoy_type_matcher.RegexMatcher_GoogleRE2{},
					},
					Regex: v.RegexMatch,
				},
			}
		}
		headersMatcher = append(headersMatcher, matcher)
	}
	virtualHost.Routes = append(virtualHost.Routes, c.WithAction(&envoy_route.Route{
		Match: c.WithPathMatch(&envoy_route.RouteMatch{
			Headers: headersMatcher,
		}),
	}))
	return nil
}

func (c RoutesConfigurer) GetRegexRewrite() *envoy_type_matcher.RegexMatchAndSubstitute {
	if c.NewPath == "" {
		return nil
	}
	return &envoy_type_matcher.RegexMatchAndSubstitute{
		Pattern: &envoy_type_matcher.RegexMatcher{
			EngineType: &envoy_type_matcher.RegexMatcher_GoogleRe2{
				GoogleRe2: &envoy_type_matcher.RegexMatcher_GoogleRE2{},
			},
			Regex: `.*`,
		},
		Substitution: c.NewPath,
	}
}

func (c RoutesConfigurer) WithPathMatch(routeMatch *envoy_route.RouteMatch) *envoy_route.RouteMatch {
	if c.MatchPath == "" {
		routeMatch.PathSpecifier = &envoy_route.RouteMatch_Prefix{
			Prefix: "/",
		}
	} else {
		routeMatch.PathSpecifier = &envoy_route.RouteMatch_Path{
			Path: c.MatchPath,
		}
	}
	return routeMatch
}

func (c RoutesConfigurer) WithAction(route *envoy_route.Route) *envoy_route.Route {
	switch {
	case c.StaticResponse != nil:
		route.Action = &envoy_route.Route_DirectResponse{
			DirectResponse: &envoy_route.DirectResponseAction{
				Status: c.StaticResponse.Status,
				Body: &envoy_core.DataSource{
					Specifier: &envoy_core.DataSource_InlineBytes{
						InlineBytes: c.StaticResponse.Body,
					},
				},
			},
		}
	case c.ClusterHeader != "":
		route.Action = &envoy_route.Route_Route{
			Route: &envoy_route.RouteAction{
				MetadataMatch: envoy_metadata.LbMetadata(c.Cluster.Tags()),
				RegexRewrite:  c.GetRegexRewrite(),
				ClusterSpecifier: &envoy_route.RouteAction_ClusterHeader{
					ClusterHeader: c.ClusterHeader,
				},
			},
		}
	default:
		route.Action = &envoy_route.Route_Route{
			Route: &envoy_route.RouteAction{
				MetadataMatch: envoy_metadata.LbMetadata(c.Cluster.Tags()),
				RegexRewrite:  c.GetRegexRewrite(),
				ClusterSpecifier: &envoy_route.RouteAction_Cluster{
					Cluster: c.Cluster.Name(),
				},
			},
		}
	}
	return route
}
