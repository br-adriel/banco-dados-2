'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('departamento', {
      codigo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sigla: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      descricao: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      gerente: {
        type: Sequelize.INTEGER,
        references: {
          model: 'funcionario',
          key: 'codigo',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
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
    await queryInterface.dropTable('departamento');
  },
};
