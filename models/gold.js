"use strict";
const { Model } = require("sequelize");
const CONSTANTS = require("../util/constants");
module.exports = (sequelize, DataTypes) => {
  class Gold extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Gold.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  Gold.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: [
          CONSTANTS.GOLD_TYPES.SGB,
          CONSTANTS.GOLD_TYPES.PHYSICAL_GOLD,
          CONSTANTS.GOLD_TYPES.MF_OR_ETF,
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
      modelName: "Gold",
    }
  );
  return Gold;
};
