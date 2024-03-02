"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MutualFund extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MutualFund.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  MutualFund.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      nav: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      quantity: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      smallCapPercentage: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      midCapPercentage: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      largeCapPercentage: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      cashPercentage: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      value: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.nav * this.quantity;
        }
      }
    },
    {
      sequelize,
      modelName: "MutualFund",
      validate: {
        allPercentageMustBe100() {
          const cnt =
            this.smallCapPercentage +
            this.midCapPercentage +
            this.largeCapPercentage +
            this.cashPercentage;
          if (cnt !== 100) {
            throw new Error("All percentage must be 100%");
          }
        },
      },
    }
  );
  return MutualFund;
};
