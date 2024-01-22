.PHONY: all warfrost-backend warfrost-frontend run-backend run-frontend create-network stop clear

all: warfrost-backend warfrost-frontend create-network run-backend run-frontend

build: warfrost-backend warfrost-frontend

warfrost-backend:
	docker buildx build --build-context warfrost=backend -t warfrost-backend ./docker/backend || true

warfrost-frontend:
	docker buildx build --build-context warfrost=frontend -t warfrost-frontend ./docker/frontend || true

create-network:
	docker network create --subnet=172.20.0.0/16 warfrost-network || true

run-backend:
	docker run -itd --net warfrost-network --ip 172.20.0.2 --name container-warfrost-backend warfrost-backend || true

run-frontend:
	docker run -itd -p 80:80 --net warfrost-network --ip 172.20.0.3 --name container-warfrost-frontend warfrost-frontend || true

stop:
	docker stop container-warfrost-backend container-warfrost-frontend || true

clear: stop
	docker rm container-warfrost-backend container-warfrost-frontend || true
	docker network rm warfrost-network || true
