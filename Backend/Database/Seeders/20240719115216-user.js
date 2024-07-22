'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert('users', [
      {
        first_name: "Josh",
        last_name: "Will",
        username: "josh_will",
        email: "josh.w@gmail.com",
        password: "$2b$10$VkIzlIyHN7GhLMa.I9I42Oshs7OrG09Ken4dq51KWKDx1j7C7VZka", //josh123
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {

    return await queryInterface.bulkDelete('users', null, {});
  }
};