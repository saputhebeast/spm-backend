FROM node:16-alpine

WORKDIR /usr/app

COPY ./package.json ./

RUN npm install

COPY ./ ./

RUN npx prisma generate

RUN npx prisma migrate deploy

CMD ["npm", "start"]
