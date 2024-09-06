const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../../config/database");

class DocumentType extends Model {
  /*
   * Modelo para las promociones
   */
}

DocumentType.init(
  {
    documentTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    documentTypeName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "DocumentType",
    tableName: "document_types",
    timestamps: false,
  }
);

module.exports = DocumentType;
