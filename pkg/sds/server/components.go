package server

import (
	"github.com/pkg/errors"
	"google.golang.org/grpc"

	core_runtime "github.com/kumahq/kuma/pkg/core/runtime"
	"github.com/kumahq/kuma/pkg/sds/server/metrics"
	v2 "github.com/kumahq/kuma/pkg/sds/server/v2"
	v3 "github.com/kumahq/kuma/pkg/sds/server/v3"
)

func RegisterSDS(rt core_runtime.Runtime, server *grpc.Server) error {
	sdsMetrics, err := metrics.NewSDSMetrics(rt.Metrics())
	if err != nil {
		return err
	}

	if err := v2.RegisterSDS(rt, sdsMetrics, server); err != nil {
		return errors.Wrap(err, "could not register V2 SDS")
	}
	if err := v3.RegisterSDS(rt, sdsMetrics, server); err != nil {
		return errors.Wrap(err, "could not register V3 SDS")
	}
	return nil
}
