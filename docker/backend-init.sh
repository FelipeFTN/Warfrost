# Switch working dir
cd ../backend

# Build Image
docker buildx build -t warfrost-backend .

# Run Container
docker run -itd --net warfrost-network --ip 172.20.0.2 --name container-warfrost-backend warfrost-backend
