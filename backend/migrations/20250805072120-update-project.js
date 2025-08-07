'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('project_techstacks', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'projects',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      techstack_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'techstacks',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {  // ← camelCase sesuai default Sequelize
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('project_techstacks');
  }
};
