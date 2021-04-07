'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'users_to_groups',
      'created_at',
      Sequelize.DATE,
      { allowNull: false }
    );
    await queryInterface.addColumn(
      'users_to_groups',
      'updated_at',
      Sequelize.DATE,
      { allowNull: false }
    );
  },

  down: async (queryInterface, Sequelize) => {},
};
