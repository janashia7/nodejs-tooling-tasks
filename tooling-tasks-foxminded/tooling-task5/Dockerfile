FROM node:latest
WORKDIR /usr/src/healthcheck
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 8080
CMD [ "node", "server.js" ]