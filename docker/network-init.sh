# Create network
docker network create --subnet=172.20.0.0/16 warfrost-network

# List all networks
docker network ls

# Inspect warfrost-network
docker network inspect warfrost-network
