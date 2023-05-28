const { fakerPT_BR: faker } = require('@faker-js/faker');
const Atividade = require('../models/Atividade.js');
const Membro = require('../models/Membro.js');
const AtividadeMembro = require('../models/AtividadeMembro.js');

let atividadesPk;
let membrosPk;

async function loadAtividadesPk() {
  const atividades = await Atividade.findAll({ limit: 200 });
  atividadesPk = atividades.map((a) => a.dataValues.codigo);
}

async function loadMembrosPk() {
  const membros = await Membro.findAll({ limit: 200 });
  membrosPk = membros.map((m) => m.dataValues.codigo);
}

/**
 * Gera dados falsos para a tabela AtividadeMembro.
 *
 * @returns {{
 *  codatividade: number,
 *  codmembro: number,
 * }} Objeto contendo os dados falsos gerados.
 */
function gerarDados() {
  const codatividade = faker.helpers.arrayElement(atividadesPk);
  const codmembro = faker.helpers.arrayElement(membrosPk);

  return {
    codatividade,
    codmembro,
  };
}

/**
 * Popula a tabela AtividadeMembro com dados falsos.
 *
 * @param {number} quantidade - A quantidade de registros a serem populados (padrão: 1).
 * @returns {Promise<boolean>} Uma promessa que indica se a operação foi bem-sucedida (true) ou não (false).
 */
async function popular(quantidade = 1) {
  try {
    await loadMembrosPk();
    await loadAtividadesPk();

    for (let i = 0; i < quantidade; i++) {
      await AtividadeMembro.create(gerarDados(), {
        ignoreDuplicates: true,
      });
    }
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
}

module.exports = {
  popular,
};
