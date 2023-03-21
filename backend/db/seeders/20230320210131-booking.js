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
        startDate: 19910531,
        endDate: 19920602,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: [19910531]}
    }, {})
  }
};
