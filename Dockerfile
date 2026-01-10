# Use Node.js 20 slim as base
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install ALL dependencies (including devDependencies for the build)
RUN npm install

# Copy the rest of the application
COPY . .

# Run the Vite build
RUN npm run build

# Set environment to production
ENV NODE_ENV=production
ENV PORT=8088

# Expose the port
EXPOSE 8088

# Use node to run the server wrapper
CMD ["node", "server.js"]
