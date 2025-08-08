// const { Sequelize } = require('sequelize');

// // Ganti konfigurasi ini sesuai dengan environment-mu
// const db = new Sequelize('portfolio_web', 'postgres', 'aping123', {
//   host: 'localhost',
//   dialect: 'postgres',
//   logging: false, 
// });

// module.exports = db;

// database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DB_URI, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  },
  logging: false,
});

module.exports = db;
