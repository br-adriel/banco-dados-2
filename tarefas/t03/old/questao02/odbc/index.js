const { Client } = require('pg');

const nomeBanco = 'db_ativ_3';
const stringDeConexao = `postgresql://postgres:postgres@localhost:5432`;

async function main() {
  try {
    // cria o banco de dados ---------------------------------------------------
    const client = new Client({
      connectionString: `${stringDeConexao}`,
    });

    await client.connect(); // abre a conexão
    await client.query(`CREATE DATABASE ${nomeBanco}`); // cria o banco
    await client.end(); // fecha a conexão

    // cria as tabelas ---------------------------------------------------------
    const client2 = new Client({
      connectionString: `${stringDeConexao}/${nomeBanco}`,
    });

    // abre a conexão
    await client2.connect();

    // cria a tabela funcionario
    await client2.query(`
      CREATE TABLE funcionario (
        codigo serial,
        nome varchar(15) NOT NULL,
        sexo char(1) DEFAULT NULL,
        dataNasc date DEFAULT NULL,
        salario decimal(10,2) DEFAULT NULL,
        supervisor int,
        depto int,
        PRIMARY KEY (codigo),
        CONSTRAINT funcSuperFK FOREIGN KEY (supervisor) REFERENCES funcionario(codigo) on delete set null on update cascade
      );
    `);

    // cria a tabela departamento
    await client2.query(`
      CREATE TABLE departamento (
        codigo serial,
        sigla varchar(15) NOT NULL UNIQUE,
        descricao varchar(25) NOT NULL,
        gerente int,
        PRIMARY KEY (codigo),
        CONSTRAINT depGerenteFK FOREIGN KEY (gerente) REFERENCES funcionario(codigo) on delete set null on update cascade
      );
    `);

    // adiciona a FK departamento em funcionario
    await client2.query(`
      alter table funcionario ADD CONSTRAINT
        funcDeptoFK FOREIGN KEY (depto) REFERENCES departamento(codigo)
        on delete set null on update cascade;
    `);

    // cria a tabela equipe
    await client2.query(`
      CREATE TABLE equipe (
        codigo serial,
        nomeEquipe varchar(45) DEFAULT NULL,
        PRIMARY KEY (codigo)
      );
    `);

    // cria a tabela membro
    await client2.query(`
      CREATE TABLE membro (
        codigo serial,
        codEquipe int,
        codFuncionario int,
        PRIMARY KEY (codigo),
        foreign key (codEquipe) references equipe(codigo) on delete set null,
        foreign key (codFuncionario) references funcionario(codigo) on delete set null
      );
    `);

    // cria a tabela projeto
    await client2.query(`
      CREATE TABLE projeto (
        codigo serial,
        descricao varchar(45) DEFAULT NULL,
        depto int,
        responsavel int,
        dataInicio date DEFAULT NULL,
        dataFim date DEFAULT NULL,
        situacao varchar(45) DEFAULT NULL,
        dataConclusao date DEFAULT NULL,
        equipe int,
        PRIMARY KEY (codigo),
        foreign key (depto) references departamento(codigo) on delete set null,
        foreign key (responsavel) references funcionario(codigo) on delete set null,
        foreign key (equipe) references equipe(codigo) on delete set null
      );
    `);

    // cria a tabela atividade
    await client2.query(`
      CREATE TABLE atividade (
        codigo serial,
        descricao varchar(45) DEFAULT NULL,
        dataInicio date DEFAULT NULL,
        dataFim date DEFAULT NULL,
        situacao varchar(45) DEFAULT NULL,
        dataConclusao date DEFAULT NULL,
        PRIMARY KEY (codigo)
      );
    `);

    // cria a tabela atividade_projeto
    await client2.query(`
      CREATE TABLE atividade_projeto (
        codAtividade int,
        codProjeto int,
        PRIMARY KEY (codProjeto, codAtividade),
        foreign key (codAtividade) references atividade(codigo),
        foreign key (codProjeto) references projeto(codigo)
      );
    `);

    // cria a tabela atividade_membro
    await client2.query(`
    CREATE TABLE atividade_membro (
      codAtividade int,
      codMembro int,
      PRIMARY KEY (codAtividade, codMembro),
      foreign key (codAtividade) references atividade(codigo),
      foreign key (codMembro) references membro(codigo)
      );`);

    // encerra a conexão
    await client2.end();
  } catch (err) {
    console.log(err);
  }
}

main();
