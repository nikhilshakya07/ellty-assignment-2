# Use Node.js 18 (lightweight version)
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy all source code
COPY . .

# Tell Docker this app uses port 5000
EXPOSE 5000

# Command to start the server
CMD ["npm", "run", "dev"]