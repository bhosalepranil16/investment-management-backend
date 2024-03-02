"use strict";
const { Model } = require("sequelize");
const CONSTANTS = require("../util/constants");
module.exports = (sequelize, DataTypes) => {
  class Debt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Debt.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  Debt.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: [
          CONSTANTS.DEBT_TYPES.SAVING_ACCOUNT_BALANCE,
          CONSTANTS.DEBT_TYPES.BONDS,
          CONSTANTS.DEBT_TYPES.GOVERNMENT_SECURITIES,
          CONSTANTS.DEBT_TYPES.FD,
          CONSTANTS.DEBT_TYPES.DEBT_MF,
        ],
      },
      value: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Debt",
    }
  );
  return Debt;
};
