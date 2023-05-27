const { fakerPT_BR: faker } = require('@faker-js/faker');
const Equipe = require('../models/Equipe.js');

/**
 * Gera dados falsos para uma equipe.
 *
 * @returns {{
 *  nomeequipe: string,
 * }} Objeto contendo os dados falsos gerados.
 */
function gerarDados() {
  const nomeequipe = faker.lorem.word().toUpperCase().substring(0, 45);

  return {
    nomeequipe,
  };
}

/**
 * Popula a tabela de equipes com dados falsos.
 *
 * @param {number} quantidade - A quantidade de equipes a serem populadas (padrão: 1).
 * @returns {Promise<boolean>} Uma promessa que indica se a operação foi bem-sucedida (true) ou não (false).
 */
async function popular(quantidade = 1) {
  try {
    const equipes = [];
    for (let i = 0; i < quantidade; i++) {
      const dadosEquipe = gerarDados();
      equipes.push(dadosEquipe);
    }

    await Equipe.bulkCreate(equipes);
    return true;
  } catch (error) {
    // console.error(error);
    return false;
  }
}

module.exports = {
  popular,
};
