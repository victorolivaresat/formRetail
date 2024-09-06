const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../../config/database");

class User extends Model {
  /*
  * Models
  */
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationalId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    flgChangePass: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    flgMailBox: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    changePassDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    cantLog: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    flgBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    rememberToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    paranoid: true,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);

module.exports = User;
