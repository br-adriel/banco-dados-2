const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db.js');

class Atividade extends Model {}

Atividade.init(
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
  },
  {
    sequelize,
    modelName: 'Atividade',
    tableName: 'atividade',
    timestamps: false,
  }
);

module.exports = Atividade;
