cd ../backend

docker buildx build -t warfrost-backend .

docker run -it -d -p 8080:8080 --name container-warfrost-backend warfrost-backend
