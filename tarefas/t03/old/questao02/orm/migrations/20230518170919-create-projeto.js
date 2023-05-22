'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projeto', {
      codigo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      descricao: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      depto: {
        type: Sequelize.INTEGER,
        references: {
          model: 'departamento',
          key: 'codigo',
        },
        onDelete: 'SET NULL',
      },
      responsavel: {
        type: Sequelize.INTEGER,
        references: {
          model: 'funcionario',
          key: 'codigo',
        },
        onDelete: 'SET NULL',
      },
      dataInicio: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      dataFim: {
        type: Sequelize.DATE,
      },
      situacao: {
        type: Sequelize.STRING(45),
        defaultValue: null,
      },
      dataConclusao: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      equipe: {
        type: Sequelize.INTEGER,
        references: {
          model: 'equipe',
          key: 'codigo',
        },
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable('projeto');
  },
};
