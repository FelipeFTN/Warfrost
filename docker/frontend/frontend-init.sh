# Build Image
docker buildx build --build-context warfrost=frontend -t warfrost-frontend ./docker/frontend

# Run Container
docker run -itd -p 80:80 --net warfrost-network --ip 172.20.0.3 --name container-warfrost-frontend warfrost-frontend
