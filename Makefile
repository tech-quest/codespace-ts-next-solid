MAKEFILE_DIR := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))
PJ_NAME := `basename ${MAKEFILE_DIR}`_devcontainer
APP_CONTAINER_NAME := $(PJ_NAME)-node-1

.PHONY: open
open:
	devcontainer open .

.PHONY: remove
remove:
	docker compose -p $(PJ_NAME) -f ./.devcontainer/docker-compose.yml down --rmi all --remove-orphans

.PHONY: destroy
destroy:
	docker compose -p $(PJ_NAME) -f ./.devcontainer/docker-compose.yml down --rmi all --volumes --remove-orphans

.PHONY: refresh
refresh:
	@make remove
	@make open

.PHONY: rebuild
rebuild:
	@make destroy
	@make open

.PHONY: bash
bash:
	docker compose -p $(PJ_NAME) -f ./.devcontainer/docker-compose.yml exec node bash

.PHONY: logs
logs:
	docker compose -p $(PJ_NAME) -f ./.devcontainer/docker-compose.yml logs
