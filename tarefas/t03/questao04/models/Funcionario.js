const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db.js');

class Funcionario extends Model {}

Funcionario.init(
  {
    codigo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    sexo: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: null,
    },
    datanasc: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    salario: {
      type: DataTypes.NUMERIC(10, 2),
      allowNull: true,
      defaultValue: null,
    },
    supervisor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Funcionario',
        key: 'codigo',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    depto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Departamento',
        key: 'codigo',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  },
  {
    sequelize,
    modelName: 'Funcionario',
    tableName: 'funcionario',
    timestamps: false,
  }
);

Funcionario.hasOne(Funcionario, {
  foreignKey: 'codigo',
  sourceKey: 'supervisor',
  as: 'supervisorFuncionario',
});

module.exports = Funcionario;
