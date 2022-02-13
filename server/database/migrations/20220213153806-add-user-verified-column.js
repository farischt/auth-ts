'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'verified', {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'verified');
  }
};
