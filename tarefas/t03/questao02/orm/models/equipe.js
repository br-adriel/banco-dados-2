'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class equipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  equipe.init(
    {
      codigo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nomeEquipe: {
        type: DataTypes.STRING(45),
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: 'equipe',
    }
  );
  return equipe;
};
