"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MutualFunds", {
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
      nav: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      smallCapPercentage: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      midCapPercentage: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      largeCapPercentage: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      cashPercentage: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("MutualFunds");
  },
};
