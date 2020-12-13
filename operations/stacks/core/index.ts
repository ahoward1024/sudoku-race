import * as k8s from "@pulumi/kubernetes";

export default async (): Promise<void> => {
  const operationsNamespace = new k8s.core.v1.Namespace("operations", {
    metadata: {
      name: "operations",
      labels: { "istio-injection": "enabled" },
    },
  });
};
