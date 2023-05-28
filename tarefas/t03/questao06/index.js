const { imprimirInfo, relatorioProjeto } = require('./cli.js');
const Projeto = require('./models/Projeto.js');
const Funcionario = require('./models/Funcionario.js');
const Membro = require('./models/Membro.js');
const dayjs = require('dayjs');
const AtividadeProjeto = require('./models/AtividadeProjeto.js');
const Atividade = require('./models/Atividade.js');
const { performance } = require('perf_hooks');
const Execucao = require('./models/Execucao.js');

async function getGerenteProjetos(projetos) {
  // extrai o codigo dos responsaveis dos projetos
  const gerentesPk = Array.from(
    new Set(projetos.map((p) => p.dataValues.responsavel))
  );
  // carrega os gerentes dos projetos
  const gerentes = await Funcionario.findAll({
    where: {
      codigo: gerentesPk,
    },
  });

  const gerentesProjetos = {};
  projetos.map((p) => {
    gerentesProjetos[p.dataValues.codigo] = gerentes.filter(
      (g) => g.dataValues.codigo == p.dataValues.responsavel
    )[0]?.dataValues.nome;
  });
  return gerentesProjetos;
}

async function getQuantidadeDeMembrosDeEquipeDeProjeto(projetos) {
  // extrai o codigo das equipes
  const equipesPk = Array.from(
    new Set(projetos.map((p) => p.dataValues.equipe))
  );
  // carrega o numero de membros de cada equipe
  const membrosEquipe = await Promise.all(
    equipesPk.map(async (pk) => {
      const qtdMembros = await Membro.count({
        where: {
          codequipe: pk,
        },
      });
      return {
        equipe: pk,
        qtdMembros,
      };
    })
  );

  const qtdMembrosProjeto = {};
  projetos.map((p) => {
    qtdMembrosProjeto[p.dataValues.codigo] = membrosEquipe.filter(
      (me) => me.equipe == p.dataValues.equipe
    )[0].qtdMembros;
  });
  return qtdMembrosProjeto;
}

function getDiasAtrasoProjeto(projetos) {
  const atrasoProjetos = {};
  projetos.map((p) => {
    let dataConclusao;
    const dataFim = dayjs(p.getDataValue('datafim')).subtract(3, 'hours');

    if (p.dataValues.situacao !== 'Concluído') {
      dataConclusao = dayjs().subtract(3, 'hours');
    } else {
      dataConclusao = dayjs(p.getDataValue('dataconclusao')).subtract(
        3,
        'hours'
      );
    }

    atrasoProjetos[p.dataValues.codigo] = dataConclusao.diff(dataFim, 'day');
  });
  return atrasoProjetos;
}

async function getAtividadesProjetos(projetos) {
  const projetosPk = projetos.map((p) => p.getDataValue('codigo'));
  const atividadesProjeto = await AtividadeProjeto.findAll({
    where: {
      codprojeto: projetosPk,
    },
  });
  const atividades = await Atividade.findAll({
    where: {
      codigo: atividadesProjeto.map((ap) => ap.getDataValue('codatividade')),
    },
  });

  const atividadesPorProjeto = {};
  projetosPk.map((p) => {
    atividadesPorProjeto[p] = [];
  });

  atividadesProjeto.map((ap) => {
    const atividade = atividades.filter(
      (a) => a.getDataValue('codigo') == ap.getDataValue('codatividade')
    );
    atividadesPorProjeto[ap.getDataValue('codprojeto')].push(...atividade);
  });

  return atividadesPorProjeto;
}

function getDiasAtrasoAtividade(atividades) {
  const atrasoAtividades = atividades.map((a) => {
    let dataConclusao;
    const dataFim = dayjs(a.getDataValue('datafim')).subtract(3, 'hours');

    if (!a.getDataValue('dataconclusao')) {
      dataConclusao = dayjs().subtract(3, 'hours');
    } else {
      dataConclusao = dayjs(a.getDataValue('dataconclusao')).subtract(
        3,
        'hours'
      );
    }

    const diasAtraso = dataConclusao.diff(dataFim, 'day');
    return diasAtraso > 0 ? diasAtraso : 0;
  });
  return atrasoAtividades;
}

async function main() {
  console.clear();
  imprimirInfo('Gerando relatório...');

  const startTime = performance.now();

  const projetos = await Projeto.findAll();
  const gerentes = await getGerenteProjetos(projetos);
  const membrosEquipe = await getQuantidadeDeMembrosDeEquipeDeProjeto(projetos);
  const atividadePorProjeto = await getAtividadesProjetos(projetos);

  const endTime = performance.now();
  const tempoPercorrido = endTime - startTime;
  await Execucao.create({
    duracao: tempoPercorrido,
  });

  const diasAtrasoProj = getDiasAtrasoProjeto(projetos);

  const dadosRelatorio = projetos.map((p) => {
    const codigo = p.getDataValue('codigo');
    const diasAtrasoAtiv = getDiasAtrasoAtividade(atividadePorProjeto[codigo]);

    return {
      codigo,
      nome: p.getDataValue('descricao'),
      gerente: gerentes[codigo],
      qtdMembrosEquipe: membrosEquipe[codigo],
      diasAtraso: diasAtrasoProj[codigo],
      qtdAtividades: atividadePorProjeto[codigo].length,
      qtdAtividadesAtrasadas: diasAtrasoAtiv.filter((daa) => daa !== 0).length,
      somaDiasAtrasoAtividades: diasAtrasoAtiv.reduce((a, b) => a + b, 0),
    };
  });

  console.clear();
  dadosRelatorio.forEach(relatorioProjeto);
}

main();
