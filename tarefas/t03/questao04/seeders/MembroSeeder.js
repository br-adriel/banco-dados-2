const { fakerPT_BR: faker } = require('@faker-js/faker');
const Membro = require('../models/Membro.js');
const Funcionario = require('../models/Funcionario.js');
const Equipe = require('../models/Equipe.js');

let funcionariosPk;
let equipesPk;

async function loadEquipesPk() {
  const equipes = await Equipe.findAll({ limit: 200 });
  equipesPk = equipes.map((e) => e.dataValues.coldigo);
}

async function loadFuncionariosPk() {
  const funcionarios = await Funcionario.findAll({ limit: 200 });
  funcionariosPk = funcionarios.map((f) => f.dataValues.coldigo);
}

/**
 * Gera dados falsos para um membro.
 *
 * @returns {{
 *  codequipe: number,
 *  codfuncionario: number,
 * }} Objeto contendo os dados falsos gerados.
 */
function gerarDados() {
  const codequipe = faker.helpers.arrayElement(equipesPk);
  const codfuncionario = faker.helpers.arrayElement(funcionariosPk);

  return {
    codequipe,
    codfuncionario,
  };
}

/**
 * Popula a tabela de membros com dados falsos.
 *
 * @param {number} quantidade - A quantidade de membros a serem populados (padrão: 1).
 * @returns {Promise<boolean>} Uma promessa que indica se a operação foi bem-sucedida (true) ou não (false).
 */
async function popular(quantidade = 1) {
  try {
    await loadFuncionariosPk();
    await loadEquipesPk();

    const membros = [];
    for (let i = 0; i < quantidade; i++) {
      const dadosMembro = gerarDados();
      membros.push(dadosMembro);
    }

    await Membro.bulkCreate(membros);
    return true;
  } catch (error) {
    // console.error(error);
    return false;
  }
}

module.exports = {
  popular,
};
