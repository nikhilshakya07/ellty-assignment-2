# Use Node.js 20
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Copy .env file
COPY .env .env

# Expose port 5173 (your frontend port)
EXPOSE 5173

# Start the app
CMD ["npm", "run", "dev", "--", "--host"]