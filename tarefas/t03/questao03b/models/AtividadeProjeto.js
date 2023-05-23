const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

class AtividadeProjeto extends Model {}

AtividadeProjeto.init(
  {
    codatividade: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Atividade',
        key: 'codigo',
      },
      onUpdate: 'NO ACTION',
      onDelete: 'NO ACTION',
    },
    codprojeto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Projeto',
        key: 'codigo',
      },
      onUpdate: 'NO ACTION',
      onDelete: 'NO ACTION',
    },
  },
  {
    sequelize,
    modelName: 'AtividadeProjeto',
    tableName: 'atividade_projeto',
    timestamps: false,
  }
);

module.exports = AtividadeProjeto;
