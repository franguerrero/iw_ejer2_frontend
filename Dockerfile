# Build
FROM node:14 as builder

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build:dev


# Serve
FROM nginx

COPY --from=builder /usr/src/app/build /usr/share/nginx/html/aplicaciones

COPY src/config/nginx_dev.conf /etc/nginx/nginx.conf

# Instalacion de Nano para debug
RUN apt update && apt install nano -y

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 3000
