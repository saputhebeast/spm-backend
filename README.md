## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Create a module

```bash
nest generate service auth/auth
nest generate controller auth/auth
nest generate guard auth/auth
...
```

## Start DB Server

```bash
$ docker-compose up -d
```

## Swagger UI

```bash
http://localhost:5005/api
```

## Docker

```bash
build -> docker build -t nestjs-backend .
run -> docker run -p 5005:5005 nestjs-backend
```
