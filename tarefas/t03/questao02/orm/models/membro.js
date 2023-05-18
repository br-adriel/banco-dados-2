'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class membro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  membro.init(
    {
      codigo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      codEquipe: {
        type: DataTypes.INTEGER,
        references: {
          model: 'equipe',
          key: 'codigo',
        },
      },
      codFuncionario: {
        type: DataTypes.INTEGER,
        references: {
          model: 'funcionario',
          key: 'codigo',
        },
      },
    },
    {
      sequelize,
      modelName: 'membro',
    }
  );
  return membro;
};
