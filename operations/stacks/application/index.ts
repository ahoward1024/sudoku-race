import * as docker from "@pulumi/docker";
import * as k8s from "@pulumi/kubernetes";
import * as kx from "@pulumi/kubernetesx";
import * as pulumi from "@pulumi/pulumi";

export default async (): Promise<void> => {
  const config = new pulumi.Config();
  const pat = config.requireSecret("pat");
  const appName = "sudoku-race";

  // Build and push docker image to GitHub Container Registry
  const image = new docker.Image(appName, {
    imageName: `ghcr.io/abatilo/${appName}`,
    build: {
      context: "../",
      dockerfile: "../Dockerfile",
    },
    registry: {
      server: "ghcr.io/abatilo",
      username: "abatilo",
      password: pat,
    },
  });

  const pod = new kx.PodBuilder({
    containers: [
      {
        image: image.imageName,
        ports: [
          {
            containerPort: 8000,
          },
        ],
      },
    ],
  });
  const deployment = new kx.Deployment(appName, {
    metadata: {
      namespace: "applications",
    },
    spec: pod.asDeploymentSpec({
      replicas: 1,
      strategy: { rollingUpdate: { maxUnavailable: 0 } },
    }),
  });
  const service = deployment.createService({
    ports: [
      {
        port: 80,
        targetPort: 8000,
        protocol: "HTTP",
        name: "http",
      },
    ],
  });

  const pdb = new k8s.policy.v1beta1.PodDisruptionBudget(appName, {
    metadata: {
      namespace: deployment.metadata.namespace,
    },
    spec: {
      maxUnavailable: 0,
      selector: deployment.spec.selector,
    },
  });

  const certificate = new k8s.apiextensions.CustomResource(appName, {
    apiVersion: "cert-manager.io/v1",
    kind: "Certificate",
    metadata: {
      namespace: deployment.metadata.namespace,
    },
    spec: {
      commonName: "sudokurace.civo.aaronbatilo.dev",
      dnsNames: ["sudokurace.civo.aaronbatilo.dev"],
      issuerRef: {
        name: "letsencrypt",
        kind: "ClusterIssuer",
      },
      secretName: "sudoku-race-cert",
    },
  });

  const gateway = new k8s.apiextensions.CustomResource(appName, {
    apiVersion: "networking.istio.io/v1alpha3",
    kind: "Gateway",
    metadata: {
      namespace: deployment.metadata.namespace,
    },
    spec: {
      selector: {
        istio: "ingressgateway",
      },
      servers: [
        {
          port: {
            number: 443,
            name: "https",
            protocol: "HTTP",
          },
          hosts: ["sudokurace.civo.aaronbatilo.dev"],
        },
      ],
    },
  });

  const virtualService = new k8s.apiextensions.CustomResource(appName, {
    apiVersion: "networking.istio.io/v1alpha3",
    kind: "VirtualService",
    metadata: {
      namespace: deployment.metadata.namespace,
    },
    spec: {
      hosts: ["sudokurace.civo.aaronbatilo.dev"],
      gateways: [gateway.metadata.name],
      http: [
        {
          match: [
            {
              uri: {
                prefix: "/",
              },
            },
          ],
          route: [
            {
              destination: {
                host: service.metadata.name,
              },
              headers: {
                response: {
                  add: {
                    "Strict-Transport-Security":
                      "max-age=31536000; includeSubDomains",
                    "Content-Security-Policy": "upgrade-insecure-requests",
                    "X-Frame-Options": "SAMEORIGIN",
                    "X-Content-Type-Options": "nosniff",
                    "Referrer-Policy": "no-referrer-when-downgrade",
                    "X-XSS-Protection": "1; mode=block",
                    "Feature-Policy":
                      "geolocation none; midi none; notifications none; push none; sync-xhr none; microphone none; camera none; magnetometer none; gyroscope none; speaker self; vibrate none; fullscreen self; payment none;",
                  },
                },
              },
            },
          ],
        },
      ],
    },
  });
};
