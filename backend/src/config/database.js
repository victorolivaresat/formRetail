const { Sequelize } = require("sequelize");
const config = require("../config");

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);
  return date.format("YYYY-MM-DD HH:mm:ss.SSS");
};

const sequelize = new Sequelize(
  config.DATABASE.NAME,
  config.DATABASE.USER,
  config.DATABASE.PASSWORD,
  {
    host: config.DATABASE.HOST,
    dialect: config.DATABASE.DIALECT,
    port: config.DATABASE.PORT,
    dialectOptions: config.DATABASE.DIALECT_OPTIONS,
    timezone: "America/Lima",
  }
);

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

initializeDatabase();

module.exports = sequelize;
