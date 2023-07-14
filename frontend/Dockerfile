# Build and Run the Docker Image
#
# $ docker build -t warfrost-frontend .
# OR:
# $ docker buildx build -t warfrost-frontend .
# THEN:
# $ docker run -it -d -p 80:80 --name container-warfrost-frontend warfrost-frontend
#

# Node official image
FROM node:20-alpine as build-stage

# Set up Working directory
WORKDIR /app

# Install Dependencies
COPY package*.json ./

RUN npm install

# Copy all files
COPY . .

# Set Environment Variables
ENV PORT=80

# Build Phaser game
RUN npm run build

# Nginx stage
FROM nginx:stable-alpine as production-stage

# Copy the build output to replace the default nginx contents
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy the nginx configuration file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
