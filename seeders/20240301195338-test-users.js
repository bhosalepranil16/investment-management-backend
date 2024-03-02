"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Pranil Ram Bhosale",
        email: "bhosalepranil16@gmail.com",
        mobileNumber: "+918605047073",
        dateOfBirth: new Date(),
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGVOdW1iZXIiOiIrOTE4NjA1MDQ3MDczIiwiaWF0IjoxNzA5MzE3NDgyfQ.0gSO8BQ9peIfw9oRb4jgE8o0UdAzAyJtqrO6Q873t-w",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
