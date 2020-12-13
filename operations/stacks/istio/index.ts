import * as k8s from "@pulumi/kubernetes";
import * as path from "path";

export default async (): Promise<void> => {
  // Istio was manually vendored since the chart is not hosted anywhere.
  // We pinned at version:
  // https://github.com/istio/istio/tree/1.8.1

  const istioSystemNamespace = new k8s.core.v1.Namespace("istio-system", {
    metadata: {
      name: "istio-system",
    },
  });

  const istioBase = new k8s.helm.v3.Chart("istio-base", {
    namespace: "istio-system",
    path: path.relative(process.cwd(), `${__dirname}/charts/base`),
  });

  const istioDiscovery = new k8s.helm.v3.Chart(
    "istio-discovery",
    {
      namespace: "istio-system",
      path: path.relative(
        process.cwd(),
        `${__dirname}/charts/istio-control/istio-discovery`
      ),
      values: {
        global: {
          hub: "docker.io/istio",
          tag: "1.8.1",
        },
      },
    },
    { dependsOn: [istioBase] }
  );

  const istioIngress = new k8s.helm.v3.Chart(
    "istio-ingress",
    {
      namespace: "istio-system",
      path: path.relative(
        process.cwd(),
        `${__dirname}/charts/gateways/istio-ingress`
      ),
      values: {
        global: {
          hub: "docker.io/istio",
          tag: "1.8.1",
        },
      },
    },
    { dependsOn: [istioBase, istioDiscovery] }
  );

  const gateway = new k8s.apiextensions.CustomResource("global-gateway", {
    apiVersion: "networking.istio.io/v1alpha3",
    kind: "Gateway",
    metadata: {
      namespace: "istio-system",
      name: "global-gateway",
      labels: {
        app: "ingressgateway",
      },
    },
    spec: {
      selector: {
        istio: "ingressgateway",
      },
      servers: [
        {
          port: {
            number: 80,
            name: "http",
            protocol: "HTTP",
          },
          hosts: ["*"],
        },
      ],
    },
  });
};
