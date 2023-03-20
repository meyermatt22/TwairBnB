'use strict';

const { SpotImage } = require('../models');

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
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await SpotImage.bulkCreate(spotimages)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SpotImages', null, {});
  }
};
