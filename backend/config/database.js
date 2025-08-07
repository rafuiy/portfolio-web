const { Sequelize } = require('sequelize');

// Ganti konfigurasi ini sesuai dengan environment-mu
const db = new Sequelize('portfolio_web', 'postgres', 'aping123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, 
});

module.exports = db;