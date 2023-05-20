#!/bin/bash

# Stop and remove the existing express-app container
docker stop express-app
docker stop webapp

docker rm express-app
docker rm webapp

# Rebuild the express-app container
docker-compose build backend
docker-compose build webapp

# Start the updated containers
docker-compose up -d