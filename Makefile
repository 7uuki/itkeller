# ITKeller Makefile
# Simple commands for deployment and management

.PHONY: deploy down pull build up logs status clean help

# Default target
help:
	@echo "ITKeller Deployment Commands:"
	@echo "  make deploy  - Full deployment (down, pull, build, up)"
	@echo "  make down    - Stop containers"
	@echo "  make pull    - Pull latest git changes"
	@echo "  make build   - Build containers"
	@echo "  make up      - Start containers"
	@echo "  make logs    - Show container logs"
	@echo "  make status  - Show container status"
	@echo "  make clean   - Clean up unused containers and images"

# Full deployment process
deploy: down pull build up
	@echo "✅ Deployment completed!"

# Stop containers
down:
	@echo "🛑 Stopping containers..."
	docker compose down

# Pull latest changes
pull:
	@echo "📥 Pulling latest changes..."
	git pull

# Build containers
build:
	@echo "🏗️  Building containers..."
	sudo docker-compose build

# Start containers
up:
	@echo "🚀 Starting containers..."
	sudo docker-compose up -d

# Show logs
logs:
	@echo "📋 Container logs:"
	docker-compose logs -f

# Show status
status:
	@echo "📊 Container status:"
	docker ps --filter "name=itkeller"

# Clean up
clean:
	@echo "🧹 Cleaning up..."
	docker system prune -f
