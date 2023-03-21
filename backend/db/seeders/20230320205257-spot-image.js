'use strict';

const { SpotImage } = require('../models');

// const spotimages = [
//   {
//     url: 'http://runescape.com',
//     preview: true,
//   },
//   {
//     url: 'http://runescape.com',
//     preview: true,
//   },
//   {
//     url: 'http://runescape.com',
//     preview: false,
//   },
//   {
//     url: 'http://runescape.com',
//     preview: true,
//   },
//   {
//     url: 'http://runescape.com',
//     preview: false,
//   },
// ]

/** @type {import('sequelize-cli').Migration} */
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
   await SpotImage.bulkCreate([
    {
      url: 'http://runescape.com',
      preview: true,
    },
    {
      url: 'http://runescape.com',
      preview: true,
    },
    {
      url: 'http://runescape.com',
      preview: false,
    },
    {
      url: 'http://runescape.com',
      preview: true,
    },
    {
      url: 'http://runescape.com',
      preview: false,
    },
  ], {})
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
