const { fakerPT_BR: faker } = require('@faker-js/faker');
const Atividade = require('../models/Atividade.js');

/**
 * Gera dados falsos para uma atividade.
 *
 * @returns {{
 *  descricao: string,
 *  datainicio: string | null,
 *  datafim: string | null,
 *  situacao: string | null,
 *  dataconclusao: string | null,
 * }} Objeto contendo os dados falsos gerados.
 */
function gerarDados() {
  const descricao = faker.lorem.sentence().substring(0, 45);
  const datainicio = faker.date.between({
    from: '2023-01-01',
    to: '2023-12-31',
  });
  const datafim = faker.date.between({ from: datainicio, to: '2024-12-31' });
  const situacao = faker.helpers.arrayElement(['Em andamento', 'Concluída']);
  const dataconclusao =
    situacao === 'Concluída'
      ? faker.date.between({ from: datainicio, to: datafim })
      : null;

  return {
    descricao,
    datainicio,
    datafim,
    situacao,
    dataconclusao,
  };
}

/**
 * Popula a tabela de atividades com dados falsos.
 *
 * @param {number} quantidade - A quantidade de atividades a serem populadas (padrão: 1).
 * @returns {Promise<boolean>} Uma promessa que indica se a operação foi bem-sucedida (true) ou não (false).
 */
async function popular(quantidade = 1) {
  try {
    const atividades = [];
    for (let i = 0; i < quantidade; i++) {
      const dadosAtividade = gerarDados();
      atividades.push(dadosAtividade);
    }

    await Atividade.bulkCreate(atividades);
    return true;
  } catch (error) {
    // console.error(error);
    return false;
  }
}

module.exports = {
  popular,
};
