FROM node:18.18.2-alpine as build

ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID

WORKDIR /app

COPY package.json .
RUN yarn cache clean --force
RUN yarn install

COPY . .
RUN VITE_FIREBASE_API_KEY=${VITE_FIREBASE_API_KEY} VITE_FIREBASE_AUTH_DOMAIN=${VITE_FIREBASE_AUTH_DOMAIN} VITE_FIREBASE_PROJECT_ID=${VITE_FIREBASE_PROJECT_ID} VITE_FIREBASE_STORAGE_BUCKET=${VITE_FIREBASE_STORAGE_BUCKET} VITE_FIREBASE_MESSAGING_SENDER_ID=${VITE_FIREBASE_MESSAGING_SENDER_ID} VITE_FIREBASE_APP_ID=${VITE_FIREBASE_APP_ID} yarn build

EXPOSE 4173

CMD ["yarn", "run", "preview"]
