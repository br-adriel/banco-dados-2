'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class atividade_projeto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  atividade_projeto.init(
    {
      codAtividade: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'atividade',
          key: 'codigo',
        },
      },
      codProjeto: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'projeto',
          key: 'codigo',
        },
      },
    },
    {
      sequelize,
      modelName: 'atividade_projeto',
    }
  );
  return atividade_projeto;
};
