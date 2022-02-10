"use strict"

// 4d56532b-cad7-4d24-afbe-8d3d709a87df

// cfebc641-2fca-40d8-8e79-c7fe0e7faa33

// c0aa4476-5547-4336-86b1-0888938104b0

// e33643fa-53d2-4c3a-991e-bea85d867cbd

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "AuthTokens",
      [
        {
          token: "4d56532b-cad7-4d24-afbe-8d3d709a87df",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          token: "cfebc641-2fca-40d8-8e79-c7fe0e7faa33",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          token: "c0aa4476-5547-4336-86b1-0888938104b0",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AuthTokens", null, {})
  },
}
