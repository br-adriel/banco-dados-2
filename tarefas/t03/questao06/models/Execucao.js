const { DataTypes, Model, literal } = require('sequelize');
const { sequelize } = require('../db.js');

class Execucao extends Model {}

Execucao.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    data_execucao: {
      type: DataTypes.DATE,
      defaultValue: literal('CURRENT_TIMESTAMP'),
    },
    duracao: {
      type: DataTypes.DECIMAL(10, 5),
    },
  },
  {
    sequelize,
    modelName: 'execucao',
    timestamps: false,
  }
);

module.exports = Execucao;
