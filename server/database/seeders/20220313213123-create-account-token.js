"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "AccountConfirmationTokens",
      [
        {
          token: "4d56532b-cad7-4d24-afbe-8d3d709a87df",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AccountConfirmationTokens", null, {})
  },
}
