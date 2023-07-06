# Docker

This folder contains the necessary scripts to build and run the Warfrost game using Docker containers. The scripts provided here simplify the process of containerizing the frontend and backend components of the game.

## Frontend

The frontend-init.sh script facilitates the Docker build and run processes for the frontend component of the Warfrost game. It performs the following actions:

1. Builds the Docker image for the frontend using Docker Buildx, which requires Buildx to be installed on your machine.
2. Runs a Docker container based on the built image, forwarding port 80 to the container's port 80, allowing access to the frontend application.

To use the frontend-init.sh script, follow these steps:

1. Ensure Docker is installed and running on your machine.
2. Install Docker Buildx by following the instructions provided in the official Docker documentation: https://docs.docker.com/buildx/working-with-buildx/
3. Open a terminal window and navigate to the Docker folder.
4. Execute the following command: \`./frontend-init.sh\`
5. Wait for the Docker build and run processes to complete.
6. Access the frontend application by visiting \`http://localhost:80\` in your web browser.

## Backend

The backend-init.sh script handles the Docker build and run processes for the backend component of the Warfrost game. It performs the following actions:

1. Builds the Docker image for the backend using Docker Buildx, which requires Buildx to be installed on your machine.
2. Runs a Docker container based on the built image, forwarding port 8080 to the container's port 8080, enabling access to the backend API.

To use the backend-init.sh script, follow these steps:

1. Ensure Docker is installed and running on your machine.
2. Install Docker Buildx by following the instructions provided in the official Docker documentation: https://docs.docker.com/buildx/working-with-buildx/
3. Open a terminal window and navigate to the Docker folder.
4. Execute the following command: \`./backend-init.sh\`
5. Wait for the Docker build and run processes to complete.
6. The backend API will be available at \`http://localhost:8080\`.

Please note that you may need to modify the scripts or Dockerfiles based on your specific requirements or environment setup.

For more details on customizing the Docker build and run processes, refer to the official Docker documentation at https://docs.docker.com/.

---

This repository is released under the [Apache-2.0 License](../LICENSE). Feel free to use, modify, and distribute the Docker scripts as per the terms of the license.
