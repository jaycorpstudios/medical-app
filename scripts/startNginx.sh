#!/bin/bash

BASE_PATH="/var/log/nginx"

EXIT_CODE=0
EXIT_CODE_SUCCESS=0
EXIT_CODE_ERROR=1

log_info() {
  echo -e "\033[34m[Info] 👉🏻 👉🏻 -> \033[0m $1"
}

log_error() {
  echo -e "\033[31m[Error] ❗️ 💩 -> \033[0m $1"
}

log_success() {
  echo -e "\033[32m[Success] ✅ 🎉 -> \033[0m $1"
}

log_warning() {
  echo -e "\033[33m[Warning] 🤔-> \033[0m $1"
}

log_info "Setting up NGINX for development 🤓"
log_info "\033[1m(password might be requested\033[0m)"

if [ ! -x "$(command -v nginx)" ]; then
    log_warning 'NGINX is not installed'
    if [ -x "$(command -v brew)" ]; then
        log_info "Installing NGINX"
        brew install nginx
    else
        log_error "you need to install brew in your system first"
        open https://brew.sh/index_es
        exit $EXIT_CODE_ERROR
    fi
fi

# create nginx folders and files
if [ ! -d $BASE_PATH ]; then
  log_warning "${BASE_PATH} directory do not exists 😱"
  log_info "don't worry, creating folder 📔 🤟 for you"
  sudo mkdir -p $BASE_PATH
  sudo chmod -R 777 $BASE_PATH;
fi

# add server map to hosts
# sudo sed -i '' '/medicalapp.com/c\' /etc/hosts

if ! $(grep -q medicalapp.com "/etc/hosts"); then
  log_info "Adding medicalapp.com to /etc/hosts"
  echo "127.0.0.1 medicalapp.com" | sudo tee -a /etc/hosts
fi

# start nginx
log_info 'Starting NGINX'
sudo nginx -c $(pwd)/nginx.conf
log_success 'All good, time to visit http://medicalapp.com !'
open http://medicalapp.com

exit $EXIT_CODE_SUCCESS