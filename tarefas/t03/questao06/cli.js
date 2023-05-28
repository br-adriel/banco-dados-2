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

function relatorioProjeto(p) {
  const infosBasicas =
    `O projeto ${p.nome} (#${p.codigo}) é gerenciado por ` +
    `${p.gerente} e tem ${p.qtdMembrosEquipe} membro(s) em ` +
    `sua equipe.`;

  const infoAtraso =
    p.diasAtraso > 0
      ? `O projeto está ` + chalk.red(`atrasado em ${p.diasAtraso} dias`)
      : `O projeto ` + chalk.green(`não está atrasado`);

  const infoAtividades =
    `e tem ${p.qtdAtividades} atividade(s).\n` +
    `${p.qtdAtividadesAtrasadas} atividades está(ão) atrasada(s), totalizando ` +
    `${
      p.somaDiasAtrasoAtividades > 0
        ? chalk.red(p.somaDiasAtrasoAtividades, 'dia(s) de atraso')
        : chalk.green(p.somaDiasAtrasoAtividades, 'dia(s) de atraso')
    }.\n`;
  console.log(infosBasicas);
  console.log(infoAtraso, infoAtividades);
}

module.exports = {
  imprimirErro,
  imprimirInfo,
  imprimirSucesso,
  relatorioProjeto,
};
