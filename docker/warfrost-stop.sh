# Stop all containers
sh docker/backend/backend-stop.sh
sh docker/frontend/frontend-stop.sh

# Remove network
docker network rm warfrost-network

echo "done!"
