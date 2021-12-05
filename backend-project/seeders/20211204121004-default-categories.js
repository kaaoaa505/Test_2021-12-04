'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          id: 1,
          name: 'Phones',
        },
        {
          id: 2,
          name: 'TODO',
        },
        {
          id: 3,
          name: 'Wish List',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('categories', null, {});
  },
};
