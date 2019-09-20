FROM node:10.16.3-alpine as build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
ENV NG_CLI_ANALYTICS=ci
RUN apk add --no-cache -U git \
    && npm install
COPY . .
RUN npx ng build --progress=false

FROM nginx:1.17.3-alpine
COPY --chown=nginx:nginx --from=build /app/dist/tablero-front /var/www/html
COPY nginx/site.conf /etc/nginx/conf.d/default.conf