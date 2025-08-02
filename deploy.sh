#!/bin/bash

# ITKeller Deployment Script
# This script automates the deployment process for the ITKeller website

set -e  # Exit on any error

echo "🚀 Starting ITKeller deployment..."

# Step 1: Stop running containers
echo "🛑 Stopping running containers..."
docker compose down

# Step 2: Pull latest changes from git
echo "📥 Pulling latest changes from git..."
git pull

# Step 3: Build and start containers in detached mode
echo "🏗️  Building and starting containers..."
sudo docker-compose up -d --build

echo "✅ Deployment completed successfully!"
echo "🌐 Application should be running on port 3000"

# Optional: Show running containers
echo "📋 Running containers:"
docker ps --filter "name=itkeller"
