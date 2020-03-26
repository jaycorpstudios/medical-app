FROM node:lts-alpine3.9

# File Author / Maintainer
LABEL authors="Jay <jaycorpstudios@me.com>"

ARG NODE_ENV=development

ENV NODE_ENV=${NODE_ENV}
ENV DEBUG=villafeet
ENV FORCE_DEBUG=false
ENV MONGOOSE_DEBUG=false

# Update & install required packages
RUN apk add --update nodejs bash

# Set work directory to /www
WORKDIR /www

# copy src files
COPY . ./

# Install app dependencies
RUN yarn install
RUN yarn build

# set your port
ENV PORT=4040

# expose the port to outside world
EXPOSE ${PORT}

# start command as per package.json
ENTRYPOINT ["yarn", "start"]
