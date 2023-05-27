const { fakerPT_BR: faker } = require('@faker-js/faker');
const Departamento = require('../models/Departamento.js');
const Funcionario = require('../models/Funcionario.js');

let gerentesPk;
async function loadGerentesPk() {
  const gerentes = await Funcionario.findAll({ limit: 200 });
  gerentesPk = [null, ...gerentes.map((s) => s.dataValues.codigo)];
}

/**
 * Gera dados falsos para um departamento.
 *
 * @returns {{
 *  sigla: string,
 *  descricao: string,
 *  gerente: number | null,
 * }} Objeto contendo os dados falsos gerados.
 */
function gerarDados() {
  const sigla = faker.string.uuid().substring(0, 15);
  const descricao = faker.lorem.sentence().substring(0, 25);
  const gerente = faker.helpers.arrayElement(gerentesPk);

  return {
    sigla,
    descricao,
    gerente,
  };
}

/**
 * Popula a tabela de departamentos com dados falsos.
 *
 * @param {number} quantidade - A quantidade de departamentos a serem populados (padrão: 1).
 * @returns {Promise<boolean>} Uma promessa que indica se a operação foi bem-sucedida (true) ou não (false).
 */
async function popular(quantidade = 1) {
  try {
    await loadGerentesPk();

    const departamentos = [];
    for (let i = 0; i < quantidade; i++) {
      const dadosDepartamento = gerarDados();
      departamentos.push(dadosDepartamento);
    }

    await Departamento.bulkCreate(departamentos);
    return true;
  } catch (error) {
    // console.error(error);
    return false;
  }
}

module.exports = {
  popular,
};
