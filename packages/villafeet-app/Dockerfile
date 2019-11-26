
# base image
FROM ubuntu:16.04

# Install system dependencies
WORKDIR /
RUN apt-get update && apt-get install -y curl build-essential
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Set environment variables
ENV NODE_VERSION 10.15.3
ENV YARN_VERSION 1.2.0
ENV NODE_ENV=development
ENV NVM_DIR /usr/local/nvm
ENV PORT=8001

# install nvm -> https://github.com/creationix/nvm#install-script
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

# install node and npm
RUN source $NVM_DIR/nvm.sh \
    && nvm install ${NODE_VERSION} \
    && nvm alias default ${NODE_VERSION} \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH /usr/local/bin:$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version ${YARN_VERSION}
ENV PATH /root/.yarn/bin:$PATH

# Install python as is required to compile sass
RUN apt-get update || : && apt-get install python -y
ENV PATH /node_modules/.bin:/usr/bin/python2:$PATH

# set working directory
WORKDIR /src

# copy src files
COPY . ./

# Install and cache app dependencies
RUN yarn install
# RUN yarn rebuild node-sass
RUN npm rebuild node-sass

EXPOSE $PORT

# Start app
ENTRYPOINT ["yarn"]
CMD ["dev"]