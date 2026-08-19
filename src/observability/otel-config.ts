/**
 * OpenTelemetry browser SDK setup for Angular application.
 *
 * Import in main.ts before bootstrapApplication():
 *   import './observability/otel-config';
 *
 * Or add to angular.json polyfills array.
 */

import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION, ATTR_DEPLOYMENT_ENVIRONMENT } from '@opentelemetry/semantic-conventions';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { B3Propagator } from '@opentelemetry/propagator-b3';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { AngularInstrumentation } from '@opentelemetry/instrumentation-angular';
import { registerInstrumentations } from '@opentelemetry/instrumentation';

const serviceName = 'ejemplo-angular';
const serviceVersion = '1.0.0';
const environment = 'development';
const otlpEndpoint = 'http://localhost:4317';

const resource = new Resource({
  [ATTR_SERVICE_NAME]: serviceName,
  [ATTR_SERVICE_VERSION]: serviceVersion,
  [ATTR_DEPLOYMENT_ENVIRONMENT]: environment,
  'service.namespace': 'ejemplo-angular',
});

const exporter = new OTLPTraceExporter({
  url: otlpEndpoint,
});

const provider = new WebTracerProvider({ resource });
provider.addSpanProcessor(new BatchSpanProcessor(exporter));
provider.register({
  contextManager: new ZoneContextManager(),
  propagator: new B3Propagator(),
});

registerInstrumentations({
  instrumentations: [
    new FetchInstrumentation({
      propagateTraceHeaderCorsUrls: [/.*/],
    }),
    new XMLHttpRequestInstrumentation({
      propagateTraceHeaderCorsUrls: [/.*/],
    }),
    new AngularInstrumentation(),
  ],
});

console.log(`[OTel] ${serviceName} tracing initialized, exporting to ${otlpEndpoint}`);
