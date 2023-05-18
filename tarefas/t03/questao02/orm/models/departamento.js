'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Departamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Departamento.init(
    {
      codigo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      sigla: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
      },
      descricao: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      gerente: {
        type: DataTypes.INTEGER,
        references: {
          model: 'funcionario',
          key: 'codigo',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'departamento',
    }
  );

  Departamento.hasOne(Funcionario, {
    foreignKey: 'gerente',
  });

  return Departamento;
};
