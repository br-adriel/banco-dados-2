const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db.js');

class Equipe extends Model {}

Equipe.init(
  {
    codigo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nomeequipe: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Equipe',
    tableName: 'equipe',
    timestamps: false,
  }
);

module.exports = Equipe;
