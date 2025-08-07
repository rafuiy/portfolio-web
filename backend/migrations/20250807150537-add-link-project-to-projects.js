'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('projects', 'link_project', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('projects', 'link_project');
  }
};
