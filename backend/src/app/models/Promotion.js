const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../../config/database");

class Promotion extends Model {
  /*
   * Modelo para las promociones
   */
}

Promotion.init(
  {
    promotionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    promotionName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    paranoid: true,
    modelName: "Promotion",
    tableName: "promotions",
    timestamps: true,
  }
);

module.exports = Promotion;
