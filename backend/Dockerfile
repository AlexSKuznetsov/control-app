FROM node:18-alpine3.17

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and source code
COPY package*.json src/ /usr/src/app/
COPY tsconfig.json .

# Install app dependencies
RUN npm install

# Build Typescript to JS
RUN npm run build

# Expose the desired port
EXPOSE 5000

CMD [ "npm", "start" ]
