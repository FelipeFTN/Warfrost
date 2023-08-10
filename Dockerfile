#
# WARFROST DOCKERFILE
#
# BACKEND & FRONTEND
# OFFICIAL IMAGES
#

# Node official image
FROM node:20-alpine

# Install requirements
RUN npm install

# Build dist
RUN npm run build

# Watch for new changes in code & rebuild
CMD ["npm", "run", "watch"]
