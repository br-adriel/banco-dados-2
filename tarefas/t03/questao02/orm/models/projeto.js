'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projeto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  projeto.init(
    {
      codigo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      descricao: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      depto: {
        type: DataTypes.INTEGER,
        references: {
          model: 'departamento',
          key: 'codigo',
        },
        onDelete: 'SET NULL',
      },
      responsavel: {
        type: DataTypes.INTEGER,
        references: {
          model: 'funcionario',
          key: 'codigo',
        },
        onDelete: 'SET NULL',
      },
      dataInicio: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      dataFim: {
        type: DataTypes.DATE,
      },
      situacao: {
        type: DataTypes.STRING(45),
        defaultValue: null,
      },
      dataConclusao: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      equipe: {
        type: DataTypes.INTEGER,
        references: {
          model: 'equipe',
          key: 'codigo',
        },
        onDelete: 'SET NULL',
      },
    },
    {
      sequelize,
      modelName: 'projeto',
    }
  );
  return projeto;
};
