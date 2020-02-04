# VillaFeet App

> REST API Service for [VillaFeet App](https://app.villafeet.com.mx).

### Frameworks
- Node 10 + ES6 (Babel)
- Express
- Passport
- Mongoose

### Developer tools
- Jest
- Docker
- Husky (Githooks)

## PREREQUISITES

Docker or the following dependencies: Mongo and Yarn

Install [mongodb](https://www.mongodb.com/download-center?jmp=nav#community) and fire up the server

```
mongod
```

Install [`yarn`](https://www.npmjs.com/package/yarn). Not used yarn yet? Do its awesome... and required

```
npm install -g yarn
```

## LOCAL DEVELOPMENT

```
    nvm use
    yvm use
    yarn install
```

## START SERVER

Start in development mode http://localhost:4040/health-check

```
    yarn dev
```

## BUILD FOR PROD

Build the distributable + start node server http://localhost:8080/health-check

```
    yarn build
    yarn start
```

### TEST

Run tests or code coverage in Jest

```
    yarn test
    yarn test:coverage
```

### RUN CONTAINERS WITH DOCKER COMPOSER
```
    docker-composer build
    docker-composer up
    OR
    docker-compose up --build
```
### SHELL MODE INSIDE CONTAINERS:
```
docker exec -it {CONTAINER_NAME} /bin/sh
```

## SEED INITIAL DATA FOR DEVELOPMENT
```
    yarn seed-local-data
    OR
    docker exec -i villafeetrest_rest-api_1 yarn seed-local-data
```