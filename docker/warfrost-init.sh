# Start Networks
sh network-init.sh

# Start Back-end
sh backend-init.sh

# Start Front-end
sh frontend-init.sh

# Logs
docker ps

docker network inspect warfrost-network

echo "back-end ip:"
docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container-warfrost-backend

echo ""

echo "front-end ip:"
docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container-warfrost-frontend
