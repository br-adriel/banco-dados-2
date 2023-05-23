const prompt = require('prompt-sync')();
const chalk = require('chalk');
const { sequelize } = require('./db.js');
const Projeto = require('./models/Projeto.js');

/**
 * Retorna uma lista de atividades de um projeto
 *
 * @param {*} codigoProjeto código do projeto para listar as atividades
 */
async function listarAtividadesDoProjeto(codigoProjeto) {
  try {
    const projeto = await Projeto.findOne({
      where: {
        codigo: codigoProjeto,
      },
    });
    if (!projeto) return [];

    const atividades = await projeto.getAtividades();
    return atividades.map((atividade) => {
      const obj = {
        ...atividade.dataValues,
      };
      delete obj.AtividadeProjeto;
      return obj;
    });
  } catch (error) {
    console.error(
      chalk.red('[!]'),
      'Erro ao conectar ao banco de dados:',
      error
    );
  } finally {
    await sequelize.close();
  }
}

function exibirListaDeAtividades(lista) {
  if (lista.length) {
    lista.forEach((atividade) => {
      console.log(atividade);
    });
  } else {
    console.log(chalk.blue('[i]'), `Nenhuma atividade encontrada`);
  }
}

async function main() {
  let projetoId;

  if (process.argv.length == 3) {
    projetoId = process.argv[2];
  } else {
    while (!projetoId) {
      const entradaUsuario = prompt('>>> Digite o id do projeto: ');
      const idDigitado = Number(entradaUsuario);

      if (!Number.isNaN(idDigitado) && Number.isInteger(idDigitado)) {
        projetoId = idDigitado;
      } else {
        console.log(
          chalk.red('[!]'),
          `Id de projeto inválido, tente novamente\n`
        );
      }
    }
  }

  atividades = await listarAtividadesDoProjeto(projetoId);
  exibirListaDeAtividades(atividades);
}

main();
