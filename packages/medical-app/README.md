# VillaFeet App

> CRM for [VillaFeet](https://www.villafeet.com.mx).

## INSTALL

```
    nvm use
    yvm use
    yarn install
```

## LOCAL DEVELOPMENT

```
    yarn run dev
```

## LOCAL DEVELOPMENT (DOCKER)

### BUILD IMAGE:
```
docker build -t villafeet-fe .
```
### RUN CONTAINER:
```
docker run -p 8001:8001 villafeet-fe
```
Watch for changes on src and node modules:
```
docker run -v ${PWD}:/src -v /node_modules -p 8001:8001 villafeet-fe
```
### SHELL MODE INSIDE CONTAINER:
```
docker exec -it {CONTAINER_ID} /bin/sh
```