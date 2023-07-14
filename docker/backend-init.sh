# Switch working dir
cd ../backend

# Build Image
docker buildx build -t warfrost-backend .

# Run Container
docker run -it -d -p 8080:8080 --name container-warfrost-backend warfrost-backend
