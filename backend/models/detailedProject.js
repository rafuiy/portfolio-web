const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DetailedProject = sequelize.define('DetailedProject', {
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  detailed_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  detailed_images: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: true,
  },
}, {
  tableName: 'detailed_projects',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: false,
});

module.exports = DetailedProject;
