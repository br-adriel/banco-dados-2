const { fakerPT_BR: faker } = require('@faker-js/faker');
const Atividade = require('../models/Atividade.js');
const Projeto = require('../models/Projeto.js');
const AtividadeProjeto = require('../models/AtividadeProjeto.js');

let atividadesPk;
let projetosPk;

async function loadAtividadesPk() {
  const atividades = await Atividade.findAll({ limit: 200 });
  atividadesPk = atividades.map((a) => a.dataValues.codigo);
}

async function loadProjetosPk() {
  const projetos = await Projeto.findAll({ limit: 200 });
  projetosPk = projetos.map((p) => p.dataValues.codigo);
}

/**
 * Gera dados falsos para a tabela AtividadeProjeto.
 *
 * @returns {{
 *  codatividade: number,
 *  codprojeto: number,
 * }} Objeto contendo os dados falsos gerados.
 */
function gerarDados() {
  const codatividade = faker.helpers.arrayElement(atividadesPk);
  const codprojeto = faker.helpers.arrayElement(projetosPk);

  return {
    codatividade,
    codprojeto,
  };
}

/**
 * Popula a tabela AtividadeProjeto com dados falsos.
 *
 * @param {number} quantidade - A quantidade de registros a serem populados (padrão: 1).
 * @returns {Promise<boolean>} Uma promessa que indica se a operação foi bem-sucedida (true) ou não (false).
 */
async function popular(quantidade = 1) {
  try {
    await loadProjetosPk();
    await loadAtividadesPk();

    const registros = [];
    for (let i = 0; i < quantidade; i++) {
      const dadosAtividadeProjeto = gerarDados();
      registros.push(dadosAtividadeProjeto);
    }

    await AtividadeProjeto.bulkCreate(registros);
    return true;
  } catch (error) {
    // console.error(error);
    return false;
  }
}

module.exports = {
  popular,
};
