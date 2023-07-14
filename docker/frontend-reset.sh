# Switch working dir
cd ../frontend

# Stop container
docker stop container-warfrost-frontend

# Remove Container
docker rm container-warfrost-frontend

# Remove Image
docker image rm warfrost-frontend

# Build Image
docker buildx build -t warfrost-frontend .

# Run Container
docker run -it -d -p 80:80 --name container-warfrost-frontend warfrost-frontend
