'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('funcionario', {
      name: 'fk-funcionario-depto',
      fields: ['depto'],
      references: {
        table: 'departamento',
        field: 'codigo',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      type: 'foreign key',
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint(
      'funcionario',
      'fk-funcionario-depto'
    );
  },
};
