# Switch working dir
cd ../frontend

# Build Image
docker buildx build -t warfrost-frontend .

# Run Container
docker run -it -d -p 80:80 --name container-warfrost-frontend warfrost-frontend
