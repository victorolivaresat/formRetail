const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../../config/database");

class GestionCliente extends Model {
  /*
   * Modelo para la gestión de clientes
   */
}

GestionCliente.init(
  {
    tipoCliente: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idTipoDoc: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipoDoc: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    numDoc: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    nombres: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    apePaterno: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    apeMaterno: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "GestionCliente",
    tableName: "gestionClientes",
    timestamps: false,
  }
);

module.exports = GestionCliente;
