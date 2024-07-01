FROM node:20.12.0-alpine3.19

WORKDIR /usr/src/app

COPY package.json package-lock.json turbo.json tsconfig.json ./

COPY apps ./apps
COPY packages ./packages

# Install dependencies
RUN npm install
 
# Copy app source
COPY . .
 
EXPOSE 8080
 
CMD ["npm", "run", "start-web-hook"]