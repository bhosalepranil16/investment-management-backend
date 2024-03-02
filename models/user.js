"use strict";
const { Model } = require("sequelize");
const CONSTANTS = require("../util/constants");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Gold, {
        foreignKey: "userId",
      });
      User.hasMany(models.Liability, {
        foreignKey: "userId",
      });
      User.hasMany(models.Crypto, {
        foreignKey: "userId",
      });
      User.hasMany(models.Debt, {
        foreignKey: "userId",
      });
      User.hasMany(models.IndianStock, {
        foreignKey: "userId",
      });
      User.hasMany(models.MutualFund, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: true,
        type: DataTypes.STRING,
      },
      mobileNumber: {
        allowNull: false,
        validate: {
          is: CONSTANTS.REGULAR_EXPRESSIONS.PHONE_NUMBER,
        },
        type: DataTypes.STRING(13),
        unique: true,
      },
      dateOfBirth: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      token: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
