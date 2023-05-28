const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db.js');
const AtividadeMembro = require('./AtividadeMembro.js');
const Atividade = require('./Atividade.js');

class Membro extends Model {}

Membro.init(
  {
    codigo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codequipe: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Equipe',
        key: 'codigo',
      },
      onUpdate: 'NO ACTION',
      onDelete: 'SET NULL',
    },
    codfuncionario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Funcionario',
        key: 'codigo',
      },
      onUpdate: 'NO ACTION',
      onDelete: 'SET NULL',
    },
  },
  {
    sequelize,
    modelName: 'Membro',
    tableName: 'membro',
    timestamps: false,
  }
);

Atividade.belongsToMany(Membro, {
  through: AtividadeMembro,
  foreignKey: 'codatividade',
});

Membro.belongsToMany(Atividade, {
  through: AtividadeMembro,
  foreignKey: 'codmembro',
});

module.exports = Membro;
