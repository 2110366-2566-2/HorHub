# Build stage
FROM --platform=linux/arm64 node:20.11.0-alpine as prod

WORKDIR /app

ENV GENERATE_SOURCEMAP=false

COPY package.json .

RUN npm install --force

COPY . .

RUN npm run build

# Production stage
FROM --platform=linux/arm64 nginx:alpine

COPY --from=prod /app/build /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80


