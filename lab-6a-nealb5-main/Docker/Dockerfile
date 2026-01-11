# Use an official Node runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the root directory in the container
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle the app source code inside the Docker image
COPY . .

# Make port 3000 available to the outside world
EXPOSE 3001

# Run the app when the container launches
CMD ["npm", "start"]
