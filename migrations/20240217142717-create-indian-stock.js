"use strict";
/** @type {import('sequelize-cli').Migration} */
const CONSTANTS = require("../util/constants");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("IndianStocks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: [
          CONSTANTS.INDIAN_STOCK_TYPES.LARGE_CAP,
          CONSTANTS.INDIAN_STOCK_TYPES.MID_CAP,
          CONSTANTS.INDIAN_STOCK_TYPES.SMALL_CAP,
        ],
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("IndianStocks");
  },
};
