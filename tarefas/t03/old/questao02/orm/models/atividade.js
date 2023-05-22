'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class atividade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  atividade.init(
    {
      codigo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      descricao: {
        type: DataTypes.STRING(45),
        defaultValue: null,
      },
      dataInicio: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      dataFim: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      situacao: {
        type: DataTypes.STRING(45),
        defaultValue: null,
      },
      dataConclusao: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: 'atividade',
    }
  );
  return atividade;
};
