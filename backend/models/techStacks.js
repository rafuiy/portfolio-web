const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Techstack = sequelize.define('Techstack', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tech_image: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'techstacks',
  timestamps: true,
});

module.exports = Techstack;
