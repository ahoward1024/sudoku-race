import * as k8s from "@pulumi/kubernetes";

export default async (): Promise<void> => {
  const operationsNamespace = new k8s.core.v1.Namespace("operations", {
    metadata: {
      name: "operations",
      labels: { "istio-injection": "enabled" },
    },
  });

  const applicationsNamespace = new k8s.core.v1.Namespace("applications", {
    metadata: {
      name: "applications",
      labels: { "istio-injection": "enabled" },
    },
  });
};
