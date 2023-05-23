const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

class AtividadeMembro extends Model {}

AtividadeMembro.init(
  {
    codatividade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    codmembro: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'AtividadeMembro',
    tableName: 'atividade_membro',
    timestamps: false,
  }
);

module.exports = AtividadeMembro;
