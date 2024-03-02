'use strict';
/** @type {import('sequelize-cli').Migration} */
const CONSTANTS = require("../util/constants");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Debts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM,
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
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Debts');
  }
};