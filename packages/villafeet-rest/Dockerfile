FROM node:lts-alpine3.9

# File Author / Maintainer
LABEL authors="Jay <jaycorpstudios@me.com>"

ARG NODE_ENV=production

# Update & install required packages
RUN apk add --update nodejs bash git

# Set work directory to /www
WORKDIR /www

# copy src files
COPY . ./

# Install app dependencies
RUN yarn install

# set your port
ENV PORT 4040

# expose the port to outside world
EXPOSE  4040

CMD ["yarn", "build"]

# start command as per package.json
ENTRYPOINT ["yarn", "start"]
