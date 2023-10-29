FROM node:18.18.2-alpine as build

WORKDIR /app

COPY package.json .
RUN yarn install

COPY . .
RUN yarn build

EXPOSE 5173

CMD ["yarn", "run", "dev"]
