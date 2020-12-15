allow_k8s_contexts('kind-sudoku-race')

docker_build('sudoku-race', '.',
  dockerfile='./Dockerfile',
  entrypoint='poetry run uvicorn --app-dir sudokurace entrypoint:app --reload',
  target='builder', # Only build up to the builder layer. We don't need production entrypoints
  live_update=[
    fall_back_on('./pyproject.toml'), # If dependencies change, rebuild the container
    sync('.', '/app'),                # Otherwise, sync all of the files over
    run('poetry install')             # And then re-install this application to get updates module updates
  ],
)

k8s_yaml('./operations/local_only/deployment.yaml')
k8s_resource('sudoku-race', port_forwards=['8000'])
