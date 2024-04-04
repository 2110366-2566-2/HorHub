FROM node:20.11.0-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install -g ts-node

COPY . .

RUN npx prisma generate

RUN npm run build

CMD ["npm", "run", "start"]