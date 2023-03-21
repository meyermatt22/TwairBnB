'use strict';

const bcrypt = require("bcryptjs")

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "SpotImages";
   return queryInterface.bulkInsert( options, [
    {
      url: 'http://runescape.com',
      preview: true,
      spotId: 1
    },
    {
      url: 'http://runescape.com',
      preview: true,
      spotId: 1
    },
    {
      url: 'http://runescape.com',
      preview: false,
      spotId: 1
    },
    {
      url: 'http://runescape.com',
      preview: true,
      spotId: 1
    },
    {
      url: 'http://runescape.com',
      preview: false,
      spotId: 1
    },
  ], {})
  },

  async down (queryInterface, Sequelize) {

    options.tableName = "SpotImages"
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['http://runescape.com']}
    }, {});
  }
};
