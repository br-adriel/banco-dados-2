const chalk = require('chalk');

function imprimirErro(...args) {
  console.log(chalk.red('[!]'), ...args);
}

function imprimirInfo(...args) {
  console.log(chalk.blue('[i]'), ...args);
}

function imprimirSucesso(...args) {
  console.log(chalk.green('[\u2713]'), ...args);
}

module.exports = {
  imprimirErro,
  imprimirInfo,
  imprimirSucesso,
};
