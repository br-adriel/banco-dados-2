'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('atividade', {
      codigo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      descricao: {
        type: Sequelize.STRING(45),
        defaultValue: null,
      },
      dataInicio: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      dataFim: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      situacao: {
        type: Sequelize.STRING(45),
        defaultValue: null,
      },
      dataConclusao: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('atividade');
  },
};
