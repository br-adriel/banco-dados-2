const prompt = require('prompt-sync')();
const { imprimirErro, imprimirInfo, imprimirSucesso } = require('./cli.js');
const AtividadeSeeder = require('./seeders/AtividadeSeeder.js');
const AtividadeMembroSeeder = require('./seeders/AtividadeMembroSeeder.js');
const AtividadeProjetoSeeder = require('./seeders/AtividadeProjetoSeeder.js');
const DepartamentoSeeder = require('./seeders/DepartamentoSeeder.js');
const EquipeSeeder = require('./seeders/EquipeSeeder.js');
const FuncionarioSeeder = require('./seeders/FuncionarioSeeder.js');
const MembroSeeder = require('./seeders/MembroSeeder.js');
const ProjetoSeeder = require('./seeders/ProjetoSeeder.js');

async function gerarObjetos(seeder, nomeModelo, quantidade) {
  try {
    imprimirInfo(`Gerando registros do modelo ${nomeModelo}...`);
    const operacaoRealizada = await seeder.popular(quantidade);
    if (operacaoRealizada) {
      imprimirSucesso(`${quantidade} registros gerados.`);
    } else {
      imprimirErro(`Um erro ocorreu.`);
    }
  } catch (err) {
    imprimirErro(`Um erro ocorreu.`);
  }
}

async function main() {
  console.clear();

  const seeders = {
    Atividade: AtividadeSeeder,
    AtividadeMembro: AtividadeMembroSeeder,
    AtividadeProjeto: AtividadeProjetoSeeder,
    Departamento: DepartamentoSeeder,
    Equipe: EquipeSeeder,
    Funcionario: FuncionarioSeeder,
    Membro: MembroSeeder,
    Projeto: ProjetoSeeder,
  };
  const quantidadePorModelo = {};
  const nomesModelo = Object.keys(seeders);

  nomesModelo.forEach((modelo) => {
    let entradaValida = false;

    let entrada;
    while (!entradaValida) {
      entrada = Number(
        prompt(`>>> Quantos objetos você quer gerar para o modelo ${modelo}? `)
      );
      if (!Number.isNaN(entrada) && entrada >= 0) {
        entradaValida = true;
      } else {
        imprimirErro('Valor inválido, tente novamente.');
      }
    }
    quantidadePorModelo[modelo] = entrada;
  });

  console.clear();
  for (nomeModelo of nomesModelo) {
    await gerarObjetos(
      seeders[nomeModelo],
      nomeModelo,
      quantidadePorModelo[nomeModelo]
    );
  }
}

main();
