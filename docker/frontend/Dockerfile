# Node official image
FROM node:20-alpine as build-stage

# Set up Working directory
WORKDIR /app

# Install Dependencies
COPY --from=warfrost package*.json ./

RUN npm install

# Copy all files
COPY --from=warfrost . .

# Set Environment Variables
ENV PORT=8080
ENV HOST=0.0.0.0

# Build Phaser game
RUN npm run build

# Nginx stage
FROM nginx:stable-alpine as production-stage

# Copy the build output to replace the default nginx contents
COPY --from=build-stage ./app/dist /usr/share/nginx/html

# Copy the nginx configuration file
COPY --from=warfrost nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
