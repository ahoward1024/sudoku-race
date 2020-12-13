import * as k8s from "@pulumi/kubernetes";

export default async (): Promise<void> => {
  const certManagerNamespace = new k8s.core.v1.Namespace("cert-manager", {
    metadata: {
      name: "cert-manager",
      labels: { "istio-injection": "enabled" },
    },
  });

  const certManager = new k8s.helm.v3.Chart("cert-manager", {
    namespace: "cert-manager",
    fetchOpts: {
      repo: "https://charts.jetstack.io",
    },
    chart: "cert-manager",
    version: "v1.1.0",
    values: {
      installCRDs: true,
    },
  });

  const clusterIssuer = new k8s.apiextensions.CustomResource("cluster-issuer", {
    apiVersion: "cert-manager.io/v1alpha2",
    kind: "ClusterIssuer",
    metadata: {
      namespace: certManagerNamespace.metadata.name,
      name: "letsencrypt",
    },
    spec: {
      acme: {
        server: "https://acme-v02.api.letsencrypt.org/directory",
        email: "AaronBatilo@gmail.com",
        privateKeySecretRef: {
          name: "letsencrypt",
        },
        solvers: [
          {
            http01: {
              ingress: {
                class: "istio",
              },
            },
          },
        ],
      },
    },
  });
};
