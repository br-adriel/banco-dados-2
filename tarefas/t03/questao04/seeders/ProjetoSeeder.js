const { fakerPT_BR: faker } = require('@faker-js/faker');
const Departamento = require('../models/Departamento.js');
const Funcionario = require('../models/Funcionario.js');
const Projeto = require('../models/Projeto.js');
const Equipe = require('../models/Equipe.js');

let departamentosPk;
let responsaveisPk;
let equipesPk;

async function loadDepartamentosPk() {
  const departamentos = await Departamento.findAll({ limit: 200 });
  departamentosPk = [null, ...departamentos.map((d) => d.dataValues.codigo)];
}

async function loadResponsaveisPk() {
  const responsaveis = await Funcionario.findAll({ limit: 200 });
  responsaveisPk = [null, ...responsaveis.map((s) => s.dataValues.codigo)];
}

async function loadEquipesPk() {
  const equipes = await Equipe.findAll({ limit: 200 });
  equipesPk = equipes.map((e) => e.dataValues.codigo);
}

/**
 * Gera dados falsos para um projeto.
 *
 * @returns {{
 *  descricao: string,
 *  depto: number | null,
 *  responsavel: number | null,
 *  datainicio: string | null,
 *  datafim: string | null,
 *  situacao: string | null,
 *  dataconclusao: string | null,
 *  equipe: number | null,
 * }} Objeto contendo os dados falsos gerados.
 */
function gerarDados() {
  const descricao = faker.lorem.sentence().substring(0, 45);
  const depto = faker.helpers.arrayElement(departamentosPk);
  const responsavel = faker.helpers.arrayElement(responsaveisPk);
  const datainicio = faker.date.between({
    from: '2023-01-01',
    to: '2023-12-31',
  });
  const datafim = faker.date.between({ from: datainicio, to: '2024-12-31' });
  const situacao = faker.helpers.arrayElement(['Em andamento', 'Concluído']);
  const dataconclusao =
    situacao === 'Concluído'
      ? faker.date.between({ from: datainicio, to: datafim })
      : null;
  const equipe = faker.helpers.arrayElement(equipesPk);

  return {
    descricao,
    depto,
    responsavel,
    datainicio,
    datafim,
    situacao,
    dataconclusao,
    equipe,
  };
}

/**
 * Popula a tabela de projetos com dados falsos.
 *
 * @param {number} quantidade - A quantidade de projetos a serem populados (padrão: 1).
 * @returns {Promise<boolean>} Uma promessa que indica se a operação foi bem-sucedida (true) ou não (false).
 */
async function popular(quantidade = 1) {
  try {
    await loadDepartamentosPk();
    await loadResponsaveisPk();
    await loadEquipesPk();

    const projetos = [];
    for (let i = 0; i < quantidade; i++) {
      const dadosProjeto = gerarDados();
      projetos.push(dadosProjeto);
    }

    await Projeto.bulkCreate(projetos);
    return true;
  } catch (error) {
    // console.error(error);
    return false;
  }
}

module.exports = {
  popular,
};
