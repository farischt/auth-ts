"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Faris",
          lastName: "Chtatou",
          email: "f.chtatou@gmail.com",
          // Password is "Test001!"
          password:
            "$2a$10$taBiMKqbBuCH4iYnM8Ts5O16IKWZ.25nm4/YKB42/jal28/FusQqi",
          verified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {})
  },
}
