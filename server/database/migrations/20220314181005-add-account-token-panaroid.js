"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("AccountConfirmationTokens", "deletedAt", {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("AccountConfirmationTokens", "deletedAt")
  },
}
