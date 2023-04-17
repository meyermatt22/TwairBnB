'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Reviews"
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        review: 'I dont know why anyone would agree to stay in such a place',
        stars: 1
      },
      {
        spotId: 1,
        userId: 3,
        review: 'free fleas and pabst are given upon arrival.',
        stars: 3
      },
      {
        spotId: 2,
        userId: 3,
        review: 'what year is it? who doesnt have a trash can?',
        stars: 2
      },
      {
        spotId: 2,
        userId: 4,
        review: 'More owls than expected., although, they were quite friendly.',
        stars: 4
      },
      {
        spotId: 3,
        userId: 5,
        review: 'Amazing scenery and pipe tobbacco!',
        stars: 5
      },
      {
        spotId: 3,
        userId: 4,
        review: 'The neighbors didnt give me a moments peace',
        stars: 2
      },
      {
        spotId: 4,
        userId: 2,
        review: 'careful what you eat',
        stars: 2
      },
      {
        spotId: 4,
        userId: 1,
        review: 'lots of coins are for the taking, if you are brave enough',
        stars: 3
      },
      {
        spotId: 5,
        userId: 2,
        review: 'They put the PRO in propane, i ate all the meat and tasted none of the heat!',
        stars: 5
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1]}
    }, {})
  }
};
