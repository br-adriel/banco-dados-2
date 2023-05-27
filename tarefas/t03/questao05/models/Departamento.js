const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db.js');
const Funcionario = require('./Funcionario.js');

class Departamento extends Model {}

Departamento.init(
  {
    codigo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      allowNull: true,
      references: {
        model: 'Funcionario',
        key: 'codigo',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  },
  {
    sequelize,
    modelName: 'Departamento',
    tableName: 'departamento',
    timestamps: false,
  }
);

Departamento.hasOne(Funcionario, {
  foreignKey: 'codigo',
  sourceKey: 'gerente',
  as: 'gerenteDepartamento',
});

Funcionario.belongsTo(Departamento, {
  foreignKey: 'depto',
  targetKey: 'codigo',
  as: 'departamentoFuncionario',
});

module.exports = Departamento;
