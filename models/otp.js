"use strict";
const { Model } = require("sequelize");
const CONSTANTS = require("../util/constants");
module.exports = (sequelize, DataTypes) => {
  class OTP extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OTP.init(
    {
      otp: {
        allowNull: false,
        type: DataTypes.STRING(6),
      },
      phoneNumber: {
        allowNull: false,
        type: DataTypes.STRING(13),
        unique: true,
        validate: {
          is: CONSTANTS.REGULAR_EXPRESSIONS.PHONE_NUMBER,
        },
      },
    },
    {
      sequelize,
      modelName: "OTP",
    }
  );
  return OTP;
};
