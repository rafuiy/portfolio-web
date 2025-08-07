const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
  name: {
  type: DataTypes.STRING,
  allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'admin'
  }
}, {
  tableName: 'users'
});

module.exports = User; // ✅ Penting!
