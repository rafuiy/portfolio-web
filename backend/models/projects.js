const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
  project_icon: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  project_instance: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preview_description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'projects',
  timestamps: true,
});

module.exports = Project;
