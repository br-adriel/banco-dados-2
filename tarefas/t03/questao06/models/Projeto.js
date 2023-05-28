const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db.js');
const Atividade = require('./Atividade.js');
const AtividadeProjeto = require('./AtividadeProjeto.js');

class Projeto extends Model {}

Projeto.init(
  {
    codigo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descricao: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    depto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Departamento',
        key: 'codigo',
      },
      onUpdate: 'NO ACTION',
      onDelete: 'SET NULL',
    },
    responsavel: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Funcionario',
        key: 'codigo',
      },
      onUpdate: 'NO ACTION',
      onDelete: 'SET NULL',
    },
    datainicio: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    datafim: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    situacao: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    dataconclusao: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    equipe: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Equipe',
        key: 'codigo',
      },
      onUpdate: 'NO ACTION',
      onDelete: 'SET NULL',
    },
  },
  {
    sequelize,
    modelName: 'Projeto',
    tableName: 'projeto',
    timestamps: false,
  }
);

Atividade.belongsToMany(Projeto, {
  through: AtividadeProjeto,
  foreignKey: 'codatividade',
});

Projeto.belongsToMany(Atividade, {
  through: AtividadeProjeto,
  foreignKey: 'codprojeto',
});

module.exports = Projeto;
