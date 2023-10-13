FROM node:16-alpine

WORKDIR /usr/app

COPY ./package.json ./

RUN npm install

COPY ./ ./

RUN npx prisma generate

RUN npx prisma migrate deploy

CMD ["npm", "start"]

docker run -d -t -i ^
-e NODE_ENV='development' ^
-e DATABASE_URL='mysql://admin:Admin123@my-database.cbnvqgk6uzxr.ap-south-1.rds.amazonaws.com:3306/nest' ^
-e JWT_SECRET='super-secret' ^
-e PORT=5005 ^
-e JWT_EXPIRES_IN='365d' ^
-e AWS_REGION='ap-south-1' ^
-e AWS_ACCESS_KEY_ID='AKIARJV6V7M2MVJBM2WC' ^
-e AWS_SECRET_ACCESS_KEY='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' ^
-e AWS_BUCKET_NAME='my-se-bucket-12' ^
-p 5005:5005 ^ 
--name=spm-backend 
^ zulake/spm-backend:latest