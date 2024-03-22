"use strict";

const { DEFAULT_USER_TOKEN } = require("../tests/helpers/data");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Pranil Ram Bhosale",
        email: "bhosalepranil16@gmail.com",
        mobileNumber: "+918605047073",
        dateOfBirth: new Date(),
        token: DEFAULT_USER_TOKEN,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
