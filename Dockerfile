# Dockerfile — server service (gateway / business-logic / rbac / users / mpesa)
# Place this file in the ROOT of each service repo.
# Change the EXPOSE port to match the service (see table in DOCKER_SETUP.md).

FROM node:20-alpine

WORKDIR /app

# Copy manifests first for better layer caching
COPY package*.json ./

# Production deps only
RUN npm ci --omit=dev

COPY . .

# Update this port per service:
#   gateway        → 4500
#   business-logic → 3000
#   rbac           → 5000
#   users          → 2000
#   mpesa          → 4000
EXPOSE 4000

CMD ["npm", "start"]
