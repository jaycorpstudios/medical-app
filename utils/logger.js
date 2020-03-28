const chalk = require('chalk');
const { log } = console;

const logger = {
  info: (message) => log(chalk.blue(message)),
  infoBold: (message) => log(chalk.bold.bgBlue(message)),
  error: (message) => log(chalk.red(message)),
  errorBold: (message) => log(chalk.bold.bgRed(message)),
  warning: (message) => log(chalk.yellow(message)),
  warningBold: (message) => log(chalk.bold.black.bgYellow(message)),
  success: (message) => log(chalk.green(message)),
  successBold: (message) => log(chalk.bold.black.bgGreen(message)),
  dim: (message) => log(chalk.gray(message)),
};

module.exports = logger;
