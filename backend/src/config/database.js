const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();



Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);
  return date.format('YYYY-MM-DD HH:mm:ss.SSS');
};

const sequelize = new Sequelize( "formularioPromociones","totalsecureApp", "WJZ66$V@eNqCKRGuG*ZY",
  {
    host: "192.168.21.35",
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