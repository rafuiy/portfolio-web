const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Experience = sequelize.define('Experience', {
  instance: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'experiences',
  timestamps: true, // ← aktifkan kembali
});


module.exports = Experience;
