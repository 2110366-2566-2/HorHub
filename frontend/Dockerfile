# Build stage
FROM --platform=linux/arm64 node:20.11.0-alpine as prod

WORKDIR /app

ENV GENERATE_SOURCEMAP=false

COPY package.json .

RUN npm install --force

COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine

WORKDIR /usr/local/bin

COPY --from=prod /app/build /usr/share/nginx/html

COPY generate-config.sh .

COPY custom-nginx.template /etc/nginx/conf.d/

RUN chmod +x generate-config.sh

EXPOSE 80

ENTRYPOINT [ "/bin/sh", "generate-config.sh"]

