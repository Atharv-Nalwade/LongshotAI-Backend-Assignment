# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project directory to the working directory
COPY . .

# Expose the port your Express app is listening on (e.g., 3000)
EXPOSE 3000

# Define the command to start your Express app
CMD [ "npm", "start" ]
