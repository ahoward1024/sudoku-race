SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c
.ONESHELL:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

PROJECT_NAME = sudoku-race

.PHONY: help
help: ## View help information
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

tmp/.asdf-installs: .tool-versions ## Install all tools through asdf-vm
	@-mkdir -p $(@D)
	@-asdf plugin-add istioctl || asdf install istioctl
	@-asdf plugin-add kind     || asdf install kind
	@-asdf plugin-add kubectl  || asdf install kubectl
	@-asdf plugin-add poetry   || asdf install poetry
	@-asdf plugin-add pulumi   || asdf install pulumi
	@-asdf plugin-add python   || asdf install python
	@-touch $@

tmp/.k8s-cluster: tmp/.asdf-installs ## Create a Kubernetes cluster for local development
	@-mkdir -p $(@D)
	@-kind create cluster --name $(PROJECT_NAME)
	@-touch $@

tmp/.poetry-installs: tmp/.asdf-installs pyproject.toml
	@-mkdir -p $(@D)
	poetry install
	@-touch $@

tmp/.bootstrap: tmp/.asdf-installs tmp/.k8s-cluster tmp/.poetry-installs
	@-mkdir -p $(@D)
	@-touch $@

.PHONY: clean
clean: ## Delete local dev environment
	@-rm -rf tmp
	@-kind delete cluster --name $(PROJECT_NAME)

.PHONY: test
test: tmp/.poetry-installs ## Run all tests with coverage
	@-poetry run pytest --cov=./sudokurace ./tests

.PHONY: format
format: tmp/.poetry-installs ## Format all of your python code
	@-poetry run black .

.PHONY: up
up: tmp/.bootstrap ## Run a local development environment
	tilt up --context kind-$(PROJECT_NAME) --hud
	tilt down --context kind-$(PROJECT_NAME)
