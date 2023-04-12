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
      url: 'https://freepngimg.com/thumb/temple/31704-3-buddha-temple-transparent-background.png',
      preview: true,
      spotId: 3
    },
    {
      url: 'https://static.wikia.nocookie.net/southpark/images/6/65/McCormickFormerResidence.png/revision/latest?cb=20210305234148',
      preview: true,
      spotId: 1
    },
    {
      url: 'https://www.commonsensemedia.org/sites/default/files/styles/ratio_16_9_small/public/screenshots/csm-movie/monster-house-ss3.jpg',
      preview: true,
      spotId: 4
    },
    {
      url: 'https://static01.nyt.com/images/2011/08/24/arts/disney-2/disney-2-jumbo.jpg?quality=75&auto=webp&disable=upscale',
      preview: true,
      spotId: 2
    },
    {
      url: 'https://static.wikia.nocookie.net/kingofthehill/images/a/a4/HILL.png/revision/latest?cb=20170706011030',
      preview: true,
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
