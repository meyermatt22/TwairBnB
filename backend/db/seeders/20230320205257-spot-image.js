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
      url: 'https://freepngimg.com/thumb/temple/32338-1-temple-photos-thumb.png',
      preview: true,
      spotId: 3
    },
    {
      url: 'https://freepngimg.com/thumb/logo/84274-arts-flower-thrones-theon-of-greyjoy-visual-thumb.png',
      preview: true,
      spotId: 3
    },
    {
      url: 'https://freepngimg.com/thumb/temple/32204-3-temple-transparent-image-thumb.png',
      preview: true,
      spotId: 3
    },
    {
      url: 'https://freepngimg.com/thumb/house/155425-house-modern-luxurious-download-hq-thumb.png',
      preview: true,
      spotId: 3
    },
    {
      url: 'https://freepngimg.com/thumb/dragon/88982-mythical-robert-tyrion-character-fictional-lannister-baratheon-thumb.png',
      preview: true,
      spotId: 1
    },
    {
      url: 'https://freepngimg.com/thumb/white_house/32365-9-white-house-hd-thumb.png',
      preview: true,
      spotId: 1
    },
    {
      url: 'https://freepngimg.com/thumb/tv_shows/33567-4-house-targaryen-file-thumb.png',
      preview: true,
      spotId: 1
    },
    {
      url: 'https://freepngimg.com/thumb/temple/32338-1-temple-photos-thumb.png',
      preview: true,
      spotId: 1
    },
    {
      url: 'https://freepngimg.com/thumb/signs/57113-6-biological-hazard-sign-image-free-hq-image-thumb.png',
      preview: true,
      spotId: 1
    },
    {
      url: 'https://www.commonsensemedia.org/sites/default/files/styles/ratio_16_9_small/public/screenshots/csm-movie/monster-house-ss3.jpg',
      preview: true,
      spotId: 4
    },
    {
      url: 'https://freepngimg.com/thumb/gas_mask/11-2-gas-mask-png-file-thumb.png',
      preview: true,
      spotId: 4
    },
    {
      url: 'https://freepngimg.com/thumb/knife/9-2-knife-free-png-image-thumb.png',
      preview: true,
      spotId: 4
    },
    {
      url: 'https://freepngimg.com/thumb/rocket_raccoon/171107-raccoon-cartoon-rocket-png-download-free-thumb.png',
      preview: true,
      spotId: 4
    },
    {
      url: 'https://freepngimg.com/thumb/kitten/160935-little-kitten-free-png-hq-thumb.png',
      preview: true,
      spotId: 4
    },
    {
      url: 'https://freepngimg.com/thumb/home/36223-3-cabin-clipart-thumb.png',
      preview: true,
      spotId: 2
    },
    {
      url: 'https://freepngimg.com/thumb/mirror/10-2-mirror-free-download-png-thumb.png',
      preview: true,
      spotId: 2
    },
    {
      url: 'https://freepngimg.com/thumb/home/36223-3-cabin-clipart-thumb.png',
      preview: true,
      spotId: 2
    },
    {
      url: 'https://freepngimg.com/thumb/the_addams_family/105235-character-the-addams-family-png-free-photo-thumb.png',
      preview: true,
      spotId: 2
    },
    {
      url: 'https://freepngimg.com/thumb/gift/61358-family-silhouette-christ-parent-latter-day-of-child-thumb.png',
      preview: true,
      spotId: 2
    },
    {
      url: 'https://freepngimg.com/thumb/warehouse/27129-9-warehouse-transparent-thumb.png',
      preview: true,
      spotId: 5
    },
    {
      url: 'https://freepngimg.com/thumb/shopping%20bag/10-shopping-bag-png-image-thumb.png',
      preview: true,
      spotId: 5
    },
    {
      url: 'https://freepngimg.com/thumb/cpu/34053-6-cpu-cabinet-photos-thumb.png',
      preview: true,
      spotId: 5
    },
    {
      url: 'https://freepngimg.com/thumb/gift/175918-box-gift-free-download-png-hd-thumb.png',
      preview: true,
      spotId: 5
    },
    {
      url: 'https://freepngimg.com/thumb/kirk_hammett/2-2-kirk-hammett-picture-thumb.png',
      preview: true,
      spotId: 5
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
