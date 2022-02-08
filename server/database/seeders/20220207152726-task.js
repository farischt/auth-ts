"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert(
      "Tasks",
      [
        {
          title: "Build an app",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tasks", null, {})
  },
}
