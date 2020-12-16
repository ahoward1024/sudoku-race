import * as docker from "@pulumi/docker";
import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";

export default async (): Promise<void> => {
  const config = new pulumi.Config();
  const pat = config.requireSecret("pat");
  const appName = "sudoku-race-migrations";

  // Build and push docker image to GitHub Container Registry
  const image = new docker.Image(appName, {
    imageName: `ghcr.io/abatilo/${appName}`,
    build: {
      context: "../",
      dockerfile: "../migrations/Dockerfile.migrations",
      env: {
        DOCKER_BUILDKIT: "1",
      },
    },
    registry: {
      server: "ghcr.io/abatilo",
      username: "abatilo",
      password: pat,
    },
  });

  const migrationJob = new k8s.batch.v1.Job("migrations", {
    metadata: {
      namespace: "applications",
      annotations: {
        "sidecar.istio.io/inject": "false",
      },
    },
    spec: {
      template: {
        spec: {
          restartPolicy: "Never",
          initContainers: [
            {
              name: "init-cockroach",
              image: "busybox:1.28",
              command: [
                "sh",
                "-c",
                "until wget --timeout 1 cockroachdb-public:8080/health?ready=1; do echo waiting for cockroachdb; sleep 2; done",
              ],
            },
          ],
          containers: [
            {
              name: "migration",
              image: image.imageName,
              command: ["entrypoint"],
              args: [
                "cockroachdb://root:@cockroachdb-public:26257/?sslmode=disable",
              ],
            },
          ],
        },
      },
      backoffLimit: 1,
    },
  });

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
      init: {
        annotations: {
          "sidecar.istio.io/inject": "false",
        },
      },
      statefulset: {
        replicas: 2,
        annotations: {
          "sidecar.istio.io/inject": "false",
        },
      },
    },
  });
};
