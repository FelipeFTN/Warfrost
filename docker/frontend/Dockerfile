# Use node:20-alpine as the base image
FROM node:20-alpine AS build-stage

# Set the working directory
WORKDIR /app

# Copy the application files
COPY ./ .

# Install the dependencies
RUN npm install

# Build the application
RUN npm run build

# Use nginx:alpine as the base image
FROM nginx:stable-alpine

# Copy the built application to nginx's html directory
COPY --from=build-stage /app/build /usr/share/nginx/html

# Copy the nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
