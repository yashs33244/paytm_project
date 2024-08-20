FROM node:20.12.0-alpine3.19

WORKDIR /usr/src/app

# Copy necessary files for build process
COPY package.json package-lock.json turbo.json tsconfig.json ./

# Copy only required subdirectories
COPY apps/bank-webhook ./apps/bank-webhook
COPY packages ./packages

# Install dependencies
RUN npm install

# Run Prisma generate
RUN npm run db:generate

# Build the application
RUN npm run build

RUN npm run db:generate
# Expose the correct port
EXPOSE 8080

# Start the webhook service
CMD ["npm", "run", "start-web-hook"]
