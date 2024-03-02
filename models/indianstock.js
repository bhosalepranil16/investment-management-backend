"use strict";
const { Model } = require("sequelize");
const CONSTANTS = require("../util/constants");
module.exports = (sequelize, DataTypes) => {
  class IndianStock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      IndianStock.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  IndianStock.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: [
          CONSTANTS.INDIAN_STOCK_TYPES.LARGE_CAP,
          CONSTANTS.INDIAN_STOCK_TYPES.MID_CAP,
          CONSTANTS.INDIAN_STOCK_TYPES.SMALL_CAP,
        ],
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      price: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      value: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.quantity * this.price;
        },
      },
    },
    {
      sequelize,
      modelName: "IndianStock",
    }
  );
  return IndianStock;
};
