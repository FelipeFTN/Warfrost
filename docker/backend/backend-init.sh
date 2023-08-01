# Build Image
docker buildx build --build-context warfrost=backend -t warfrost-backend ./docker/backend

# Run Container
docker run -itd --net warfrost-network --ip 172.20.0.2 --name container-warfrost-backend warfrost-backend
