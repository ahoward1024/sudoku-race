allow_k8s_contexts('kind-sudoku-race')

docker_build('sudoku-race', '.',
  dockerfile='./Dockerfile',
  entrypoint='cd /app/sudokurace && uvicorn entrypoint:app --reload',
  target='builder',
  live_update=[
    fall_back_on('./pyproject.toml'),
    sync('./sudokurace', '/app/sudokurace')
  ],
)

k8s_yaml('./operations/local_only/deployment.yaml')
k8s_resource('sudoku-race', port_forwards=['8000'])
