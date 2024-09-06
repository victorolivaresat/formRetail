const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../../config/database");

class Store extends Model {
  /*
  * Modelo para las tiendas
  */
}

Store.init(
  {
    storeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'userId'
      }
    },
    storeName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    storeType: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'companyId'
      }
    },
    salesAreaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sales_areas',
        key: 'salesAreaId'
      }
    },
    district: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    province: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    department: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Store",
    tableName: "stores",
    timestamps: false,
  }
);

module.exports = Store;
