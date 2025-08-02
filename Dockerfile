# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy and install frontend dependencies
COPY package*.json ./
RUN npm install

# Copy frontend source and build
COPY . .
RUN npm run build

# Production stage  
FROM node:20-alpine

WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Copy backend files and install dependencies
COPY server/ ./server/
WORKDIR /app/server
RUN npm install --omit=dev

# Copy built frontend
COPY --from=build /app/dist /app/dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
RUN chown -R nodejs:nodejs /app
USER nodejs

WORKDIR /app

EXPOSE 3000

CMD ["node", "server/server.js"]
