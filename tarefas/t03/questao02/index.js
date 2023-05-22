const { Client } = require('pg');
const prompt = require('prompt-sync')();
const chalk = require('chalk');
require('dotenv').config();

// Configurações de conexão com o banco de dados
const config = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
};

/**
 * Retorna uma lista de atividades de um projeto
 *
 * @param {*} codigoProjeto código do projeto para listar as atividades
 */
async function listarAtividadesDoProjeto(codigoProjeto) {
  const client = new Client(config);

  try {
    await client.connect();

    const query = `
      SELECT a.*
      FROM atividade a
        JOIN atividade_projeto ap ON a.codigo=ap.codAtividade
        JOIN projeto p ON p.codigo=ap.codProjeto
      WHERE codProjeto = ${codigoProjeto};
    `;

    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.error(
      chalk.red('[!]'),
      'Erro ao conectar ao banco de dados:',
      error
    );
  } finally {
    await client.end();
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
