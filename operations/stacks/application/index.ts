import * as docker from "@pulumi/docker";
import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";

export default async (): Promise<void> => {
  const config = new pulumi.Config();
  const pat = config.requireSecret("pat");
  const appName = "sudoku-race";
  const appLabels = { app: appName, version: "v1" };

  // Build and push docker image to GitHub Container Registry
  const image = new docker.Image(appName, {
    imageName: `ghcr.io/abatilo/${appName}`,
    build: {
      context: "../",
      dockerfile: "../Dockerfile",
      env: {
        DOCKER_BUILDKIT: "1",
      },
      cacheFrom: {
        stages: ["builder"],
      },
    },
    registry: {
      server: "ghcr.io/abatilo",
      username: "abatilo",
      password: pat,
    },
  });

  // Build Deployment spec
  const deployment = new k8s.apps.v1.Deployment(appName, {
    metadata: {
      labels: appLabels,
      namespace: "applications",
    },
    spec: {
      strategy: {
        rollingUpdate: {
          maxUnavailable: 0,
        },
      },
      selector: { matchLabels: appLabels },
      template: {
        metadata: {
          labels: appLabels,
        },
        spec: {
          containers: [
            {
              name: "sudoku-race",
              image: image.imageName,
              ports: [
                {
                  name: "http",
                  containerPort: 8000,
                  protocol: "TCP",
                },
              ],
              resources: {
                requests: {
                  cpu: "500m",
                  memory: "500Mi",
                },
                limits: {
                  cpu: "500m",
                  memory: "500Mi",
                },
              },
              readinessProbe: {
                httpGet: {
                  path: "/healthz",
                  port: "http",
                },
                periodSeconds: 10,
                failureThreshold: 2,
              },
              livenessProbe: {
                httpGet: {
                  path: "/healthz",
                  port: "http",
                },
                initialDelaySeconds: 10,
                periodSeconds: 30,
                failureThreshold: 3,
              },
            },
          ],
        },
      },
    },
  });

  // Build Service spec
  const service = new k8s.core.v1.Service(appName, {
    metadata: {
      labels: appLabels,
      namespace: deployment.metadata.namespace,
    },
    spec: {
      selector: appLabels,
      type: "ClusterIP",
      ports: [
        {
          name: "http",
          port: 80,
          targetPort: "http",
          protocol: "TCP",
        },
      ],
    },
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

  const hpa = new k8s.autoscaling.v1.HorizontalPodAutoscaler(appName, {
    metadata: {
      namespace: deployment.metadata.namespace,
    },
    spec: {
      scaleTargetRef: {
        apiVersion: "apps/v1",
        kind: "Deployment",
        name: deployment.metadata.name,
      },
      minReplicas: 1,
      maxReplicas: 5,
      targetCPUUtilizationPercentage: 80,
    },
  });

  const certificate = new k8s.apiextensions.CustomResource(appName, {
    apiVersion: "cert-manager.io/v1",
    kind: "Certificate",
    metadata: {
      namespace: "istio-system",
    },
    spec: {
      commonName: "sudokuraceapi.civo.aaronbatilo.dev",
      dnsNames: ["sudokuraceapi.civo.aaronbatilo.dev"],
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
            protocol: "HTTPS",
          },
          hosts: ["sudokuraceapi.civo.aaronbatilo.dev"],
          tls: {
            mode: "SIMPLE",
            credentialName: "sudoku-race-cert",
          },
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
      hosts: ["sudokuraceapi.civo.aaronbatilo.dev"],
      gateways: [gateway.metadata.name],
      http: [
        {
          match: [
            {
              uri: {
                prefix: "/healthz", // Re-write so that healthz isn't publicly facing
              },
            },
          ],
          rewrite: {
            uri: "/",
          },
          route: [
            // This array can't be empty
            {
              destination: {
                host: service.metadata.name,
              },
            },
          ],
        },
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
            },
          ],
          retries: {
            attempts: 3,
            perTryTimeout: "2s",
          },
        },
      ],
    },
  });
};
