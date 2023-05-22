'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('funcionario', {
      codigo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING(15),
      },
      sexo: {
        type: Sequelize.CHAR(1),
        defaultValue: null,
      },
      dataNasc: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      salario: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: null,
      },
      supervisor: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'funcionario',
          key: 'codigo',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      depto: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('funcionario');
  },
};
