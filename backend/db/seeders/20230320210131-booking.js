'use strict';

const bcrypt = require("bcryptjs")

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = "Bookings";
    return queryInterface.bulkInsert(options, [
      {
        startDate: '2016-01-25 10:10:10.555555-05:00',
        endDate: '2016-01-26 10:10:10.555555-05:00',
        spotId: 1,
        userId: 1
      },
      {
        startDate: '2016-01-25 10:10:10.555555-05:00',
        endDate: '2016-01-26 10:10:10.555555-05:00',
        spotId: 1,
        userId: 1
      },
      {
        startDate: '2016-01-25 10:10:10.555555-05:00',
        endDate: '2016-01-26 10:10:10.555555-05:00',
        spotId: 1,
        userId: 1
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1]}
    }, {})
  }
};
