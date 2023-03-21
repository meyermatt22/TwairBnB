'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const spotimages = [
  {
    url: 'http://skyrim.com/info',
    preview: true
  },
  {
    url: 'http://skyrim.com/info',
    preview: true
  },
  {
    url: 'http://skyrim.com/info',
    preview: false
  },
  {
    url: 'http://skyrim.com/info',
    preview: true
  },
  {
    url: 'http://skyrim.com/info',
    preview: false
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    return queryInterface.bulkInsert(options, [
      {
        url: 'http://skyrim.com/info',
        reviewId: 1
      },
      {
        url: 'http://skyrim.com/info',
        reviewId: 1
      },
      {
        url: 'http://skyrim.com/info',
        reviewId: 2
      },
      {
        url: 'http://skyrim.com/info',
        reviewId: 1
      },
      {
        url: 'http://skyrim.com/info',
        reviewId: 2
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "ReviewImages"
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1,2]}
    }, {});
  }
};
