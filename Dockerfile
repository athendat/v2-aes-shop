# Stage 1: Build the Angular application
FROM node:alpine AS build
WORKDIR /app

# Copy package.json and yarn.lock to leverage Docker cache
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . ./

# Build the application with SSR
RUN yarn build

# Stage 2: Serve the application
FROM node:alpine
WORKDIR /app

# Copy the built application from the previous stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./

# Puerto de la aplicación
ENV PORT=${PORT}

# Expose the port the app runs on
EXPOSE 4000

# Start the application
CMD ["yarn", "serve:ssr"]
