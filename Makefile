# Define xk6 extension versions
K6_VERSION := v0.50.0
XK6_VERSION := v0.11.0
XK6_CLIENT_PROMETHEUS_REMOTE := v0.3.2
XK6_OUTPUT_PROMETHEUS_REMOTE := v0.4.0
XK6_FILE := v1.4.0
XK6_KAFKA := v0.25.0
XK6_SQL := v0.3.0
XK6_READ := df48412
XK6_MONGO := v1.0.3
XK6_KUBERNETES := v0.9.0
XK6_TS := latest

build:
	@-echo "Building k6 for OS $(os) and architecture $(arch)"
	@-env CGO_ENABLED=1 GOOS=$(os) GOARCH=$(arch) xk6 build ${K6_VERSION} \
		--with "github.com/grafana/xk6-client-prometheus-remote@${XK6_CLIENT_PROMETHEUS_REMOTE}" \
		--with "github.com/grafana/xk6-output-prometheus-remote@${XK6_OUTPUT_PROMETHEUS_REMOTE}" \
		--with "github.com/avitalique/xk6-file@${XK6_FILE}" \
		--with "github.com/mostafa/xk6-kafka@${XK6_KAFKA}"  \
		--with "github.com/grafana/xk6-sql@${XK6_SQL}" \
		--with "github.com/danhngo-lx/xk6-read@${XK6_READ}" \
		--with  github.com/GhMartingit/xk6-mongo@${XK6_MONGO} \
		--with github.com/grafana/xk6-kubernetes@${XK6_KUBERNETES} \
		--with github.com/grafana/xk6-ts@${XK6_TS} \
		--output "$${PWD}/bin/k6-$(os)-$(arch)"
