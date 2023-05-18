'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class atividade_membro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  atividade_membro.init(
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
      codMembro: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'membro',
          key: 'codigo',
        },
      },
    },
    {
      sequelize,
      modelName: 'atividade_membro',
    }
  );
  return atividade_membro;
};
