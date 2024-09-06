const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();



Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);
  return date.format('YYYY-MM-DD HH:mm:ss.SSS');
};

const sequelize = new Sequelize( process.env.MSSQL_DB_DATABASE, process.env.MSSQL_DB_USER, process.env.MSSQL_DB_PASSWORD,
  {
    host: process.env.MSSQL_DB_SERVER,
    dialect: 'mssql',
    port: 1433,
    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: false,
      }
    }
  }
);

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

initializeDatabase();


module.exports = sequelize;