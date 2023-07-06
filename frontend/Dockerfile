# Node official image
FROM node:20-alphine

# Set up Working directory
WORKDIR /app

# Install Dependencies
COPY package*.json ./

RUN npm install

# Copy all files
COPY . .

# Set Environment Variables
ENV PORT=80

# TODO: Run from transcripted files -> Javascript
CMD ["npm", "run", "watch"]

# Build and Run the Docker Image
#
# $ docker build -t warfrost-frontend .
# OR:
# $ docker buildx build -t warfrost-frontend .
# THEN:
# $ docker run -it -d -p 8080:8080 --name container-warfrost-frontend warfrost-frontend
#
