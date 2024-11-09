FROM node:alpine3.18
WORKDIR /app
# Install necessary SSL packages
RUN apk add --no-cache openssl

# Create directory for SSL certificates
RUN mkdir -p /etc/letsencrypt

COPY package.json ./
RUN npm install
COPY . .
EXPOSE 5000
EXPOSE 443
CMD [ "npm", "run", "start" ]