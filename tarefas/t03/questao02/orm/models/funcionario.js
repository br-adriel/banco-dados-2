'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Funcionario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Funcionario.init(
    {
      codigo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        allowNull: false,
        type: DataTypes.STRING(15),
      },
      sexo: {
        type: DataTypes.CHAR(1),
        defaultValue: null,
      },
      dataNasc: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      salario: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: null,
      },
      supervisor: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'funcionario',
          key: 'codigo',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      depto: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'funcionario',
    }
  );

  Funcionario.belongsTo(Funcionario, {
    foreignKey: 'supervisor',
    targetKey: 'codigo',
  });

  Funcionario.hasMany(Funcionario, {
    foreignKey: 'codigo',
    targetKey: 'supervisor',
  });

  return Funcionario;
};
