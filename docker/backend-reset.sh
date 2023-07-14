# Switch working dir
cd ../backend

# Stop container
docker stop container-warfrost-backend

# Remove Container
docker rm container-warfrost-backend

# Remove Image
docker image rm warfrost-backend

# Build Image
docker buildx build -t warfrost-backend .

# Run Container
docker run -it -d -p 80:80 --name container-warfrost-backend warfrost-backend
