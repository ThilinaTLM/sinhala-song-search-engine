FROM node:16-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
CMD [ "node", "dist/main.js" ]
