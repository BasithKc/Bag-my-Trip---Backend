FROM node:alpine3.18
WORKDIR /app


# Install necessary SSL packages
RUN apk add --no-cache openssl

# Create directory for SSL certificates
RUN mkdir -p /etc/letsencrypt

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "start" ]