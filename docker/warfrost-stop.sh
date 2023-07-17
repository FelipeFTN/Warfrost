# Stop all containers
sh backend-stop.sh
sh frontend-stop.sh

# Remove network
docker network rm warfrost-network

echo "done!"
