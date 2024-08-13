FROM node as build
WORKDIR /usr/src/app
COPY . .
RUN npm install -g @angular/cli && npm install --force && npm run build:ssr
CMD ["node", "./dist/nmmas-shop-ssr/server/server.mjs"]
EXPOSE 4000
