# TableroFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Deployment

### Kubernetes (Kustomize)

Apply the manifests in `k8s/` directly:

```sh
kubectl apply -k k8s/
```

### Helm

Install the chart in `helm/ejemplo-angular/`:

```sh
helm upgrade --install ejemplo-angular helm/ejemplo-angular/ --namespace staging --create-namespace
```

See `helm/ejemplo-angular/values.yaml` for configuration options (image, ingress, resources, etc.).

## CI/CD

The GitLab CI pipeline (`.gitlab-ci.yml`) provides lint, build, test, and deploy stages. Deploy jobs use Helm and require manual approval.

## Observability

OpenTelemetry browser tracing is initialized in `src/observability/otel-config.ts` and imported in `src/main.ts`.

To run the OTel Collector locally:

```sh
docker compose -f observability/docker-compose.otel.yml up -d
```

The collector listens on `localhost:4317` (OTLP gRPC) by default. Configure the endpoint at runtime by setting `window.__OTEL_ENDPOINT__` before the app boots.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
