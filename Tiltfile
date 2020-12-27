allow_k8s_contexts('kind-sudoku-race')

load('ext://helm_remote', 'helm_remote')

helm_remote('cockroachdb',
  repo_name="cockroachdb",
  repo_url='https://charts.cockroachdb.com',
  version='5.0.3',
  set=['storage.persistentVolume.size=2Gi', 'statefulset.replicas=1']
)

docker_build('migration', '.',
  dockerfile='./migrations/Dockerfile.migrations',
  only=['./migrations']
)

docker_build('sudoku-race', '.',
  dockerfile='./Dockerfile',
  entrypoint='poetry run uvicorn --app-dir sudokurace entrypoint:app --reload',
  target='builder', # Only build up to the builder layer. We don't need production entrypoints
  ignore=['./web'],
  live_update=[
    fall_back_on('./pyproject.toml'), # If dependencies change, rebuild the container
    sync('.', '/app'),                # Otherwise, sync all of the files over
    run('poetry install')             # And then re-install this application to get updates module updates
  ],
)

docker_build('ui', 'web', # Set Docker context to the web/ directory
  dockerfile='./web/Dockerfile', # Use the Dockerfile in the web/ directory
  live_update=[
    fall_back_on('./web/package.json'), # Live update on change in package dependencies
    sync('./web', '/app'), # Synchronize the app directory
    sync('./web/node_modules', '/app/node_modules'),
    sync('./web/.next', '/app/.next')
  ]
)

k8s_yaml('./operations/local_only/job.yaml')
k8s_yaml('./operations/local_only/deployment.yaml')
k8s_yaml('./operations/local_only/ui/deployment.yaml')
# k8s_resource('sudoku-race', port_forwards=['8000'], resource_deps=['migration'])
k8s_resource('sudoku-race', port_forwards=['8000'])
k8s_resource('ui', port_forwards=['3000'])
