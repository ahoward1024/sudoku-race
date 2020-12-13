import * as k8s from "@pulumi/kubernetes";

export default async (): Promise<void> => {
  const metricsServer = new k8s.helm.v3.Chart("metrics-server", {
    namespace: "operations",
    fetchOpts: {
      repo: "https://charts.bitnami.com/bitnami",
    },
    chart: "metrics-server",
    version: "5.2.0",
    values: {
      apiService: {
        create: true,
      },
      args: [
        "--logtostderr",
        "--kubelet-insecure-tls",
        "--metric-resolution=2s",
        "--kubelet-preferred-address-types=InternalIP",
      ],
    },
    transformations: [
      (obj: any) => {
        // Transformation intercepts rendered yaml, which we do to nullify the
        // metrics-server-test pod.  There's a race condition where the
        // metrics-server-test pod will be ran before metrics-server is
        // deployed.
        if (obj.metadata.name == "metrics-server-test") {
          obj.apiVersion = "v1";
          obj.kind = "List";
          obj.items = [];
        }
      },
    ],
  });
};
