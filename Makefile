.PHONY: help up down restart logs build lint test e2e seed clean status

DOCKER_DIR = docker

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

up: ## Start all services
	cd $(DOCKER_DIR) && docker compose up -d --build

down: ## Stop all services
	cd $(DOCKER_DIR) && docker compose down

restart: ## Restart all services
	cd $(DOCKER_DIR) && docker compose restart

logs: ## Tail logs for all services
	cd $(DOCKER_DIR) && docker compose logs -f

logs-api: ## Tail Saleor API logs
	cd $(DOCKER_DIR) && docker compose logs -f api

logs-storefront: ## Tail storefront logs
	cd $(DOCKER_DIR) && docker compose logs -f storefront

build: ## Build all Docker images
	cd $(DOCKER_DIR) && docker compose build

lint: ## Run linters (storefront)
	cd storefront && npm run lint

lint-fix: ## Fix lint issues (storefront)
	cd storefront && npm run lint:fix

test: ## Run tests
	cd storefront && npm test

e2e: ## Run Playwright E2E tests
	cd storefront && npx playwright test

seed: ## Populate Saleor with sample data
	cd $(DOCKER_DIR) && docker compose exec api python manage.py populatedb --createsuperuser --withoutimages

migrate: ## Run Saleor migrations
	cd $(DOCKER_DIR) && docker compose exec api python manage.py migrate

createsuperuser: ## Create a Saleor superuser (admin@example.com / admin)
	cd $(DOCKER_DIR) && docker compose exec api python manage.py createsuperuser

status: ## Show service status
	cd $(DOCKER_DIR) && docker compose ps

clean: ## Remove all containers, volumes, and build artifacts
	cd $(DOCKER_DIR) && docker compose down -v --remove-orphans
	rm -rf storefront/.next storefront/node_modules

install: ## Install storefront dependencies
	cd storefront && npm install

format: ## Format storefront code
	cd storefront && npm run format
