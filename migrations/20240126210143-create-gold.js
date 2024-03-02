"use strict";
/** @type {import('sequelize-cli').Migration} */
const CONSTANTS = require("../util/constants");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Gold", {
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
          CONSTANTS.GOLD_TYPES.SGB,
          CONSTANTS.GOLD_TYPES.PHYSICAL_GOLD,
          CONSTANTS.GOLD_TYPES.MF_OR_ETF,
        ],
      },
      value: {
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
    await queryInterface.dropTable("Gold");
  },
};
