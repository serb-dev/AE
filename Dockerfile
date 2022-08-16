FROM node:18-alpine3.15

COPY . ./AE

RUN npm install

CMD [ "node", "app.js" ]