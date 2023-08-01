# Start Networks
sh docker/network-init.sh

# Start Back-end
sh docker/backend/backend-init.sh

# Start Front-end
sh docker/frontend/frontend-init.sh

# Logs
docker ps

docker network inspect warfrost-network

echo "back-end ip:"
docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container-warfrost-backend

echo ""

echo "front-end ip:"
docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container-warfrost-frontend
