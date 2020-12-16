import * as k8s from "@pulumi/kubernetes";

export default async (): Promise<void> => {
  const cockroachdb = new k8s.helm.v3.Chart("cockroachdb", {
    namespace: "applications",
    fetchOpts: {
      repo: "https://charts.cockroachdb.com",
    },
    chart: "cockroachdb",
    version: "5.0.3",
    values: {
      storage: {
        persistentVolume: {
          size: "2Gi",
        },
      },
      statefulset: {
        replicas: 2,
      },
    },
  });
};
