FROM node:18-alpine3.17

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and source code
COPY package*.json src/ /usr/src/app/

# Install app dependencies
RUN npm install

# Expose the desired port
EXPOSE 5000

# Set the command to start the application
CMD [ "node", "src/server.js" ]