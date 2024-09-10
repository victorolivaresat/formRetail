// models/DataForm.js
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Definir el modelo
class DataForm extends Model {}

// Inicializar el modelo
DataForm.init(
  {
    dataId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exchangeDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    clientName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    numberDocumentClient: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stores',
        key: 'storeId',
      },
    },
    promotionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'promotions',
        key: 'promotionId',
      },
    },
    ticketNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    documentTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'document_types',
        key: 'documentTypeId',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    paranoid: true,
    modelName: 'DataForm',
    tableName: 'data_forms',
    timestamps: true,
  }
);

module.exports = DataForm;
