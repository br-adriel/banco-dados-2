const { fakerPT_BR: faker } = require('@faker-js/faker');
const Departamento = require('../models/Departamento.js');
const Funcionario = require('../models/Funcionario.js');

let departamentosPk;
let supervisoresPk;

async function loadDepartamentosPk() {
  const departamentos = await Departamento.findAll({ limit: 200 });
  departamentosPk = [null, ...departamentos.map((d) => d.dataValues.coldigo)];
}

async function loadSupervisoresPk() {
  const supervisores = await Funcionario.findAll({ limit: 200 });
  supervisoresPk = [null, ...supervisores.map((s) => s.dataValues.coldigo)];
}

/**
 * Gera dados falsos para um funcionário.
 *
 * @returns {{
 *  nome: string,
 *  sexo: string,
 *  datanasc: string,
 *  salario: number,
 *  supervisor: number | null,
 *  depto: number | null,
 * }} Objeto contendo os dados falsos gerados.
 */
function gerarDados() {
  const nome = faker.person.fullName().substring(0, 15);
  const sexo = faker.helpers.arrayElement(['M', 'F']);
  const datanasc = faker.date.between({
    from: '1970-01-01',
    to: '2000-12-31',
  });
  const salario = faker.finance.amount({ min: 1000, max: 10000, dec: 2 });
  const supervisor = faker.helpers.arrayElement(supervisoresPk);
  const depto = faker.helpers.arrayElement(departamentosPk);

  return {
    nome,
    sexo,
    datanasc,
    salario,
    supervisor,
    depto,
  };
}

/**
 * Popula a tabela de funcionários com dados falsos.
 *
 * @param {number} quantidade - A quantidade de funcionários a serem populados (padrão: 1).
 * @returns {Promise<boolean>} Uma promessa que indica se a operação foi bem-sucedida (true) ou não (false).
 */
async function popular(quantidade = 1) {
  try {
    await loadDepartamentosPk();
    await loadSupervisoresPk();

    const funcionarios = [];
    for (let i = 0; i < quantidade; i++) {
      const dadosFuncionario = gerarDados();
      funcionarios.push(dadosFuncionario);
    }

    await Funcionario.bulkCreate(funcionarios);
    return true;
  } catch (error) {
    // console.error(error);
    return false;
  }
}

module.exports = {
  popular,
};
