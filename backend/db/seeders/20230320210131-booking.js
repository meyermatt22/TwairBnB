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
        endDate: '2016-01-28 10:10:10.555555-05:00',
        spotId: 1,
        userId: 3
      },
      {
        startDate: '2016-01-11 10:10:10.555555-05:00',
        endDate: '2016-01-14 10:10:10.555555-05:00',
        spotId: 2,
        userId: 2
      },
      {
        startDate: '2016-01-01 10:10:10.555555-05:00',
        endDate: '2016-01-08 10:10:10.555555-05:00',
        spotId: 3,
        userId: 1
      },
      {
        startDate: '2016-02-02 10:10:10.555555-05:00',
        endDate: '2016-02-12 10:10:10.555555-05:00',
        spotId: 4,
        userId: 1
      },
      {
        startDate: '2016-03-25 10:10:10.555555-05:00',
        endDate: '2016-03-29 10:10:10.555555-05:00',
        spotId: 1,
        userId: 2
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3,4]}
    }, {})
  }
};
