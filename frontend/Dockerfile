# Build stage
FROM node:20.11.0-alpine as build

WORKDIR /app

ENV GENERATE_SOURCEMAP=false

COPY package.json .

RUN npm install --force

COPY . .

RUN npm run build

# Production stage
FROM node:20.11.0-alpine as prod

COPY --from=build /app/package.json /app/

COPY --from=build /app/build /app/build/

WORKDIR /app

RUN npm install -g serve 

EXPOSE 3000:3000

CMD ["npm", "run", "start:prod"]

