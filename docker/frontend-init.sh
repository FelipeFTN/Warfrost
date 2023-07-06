cd ../frontend

docker buildx build -t warfrost-frontend .

docker run -it -d -p 80:80 --name container-warfrost-frontend warfrost-frontend
