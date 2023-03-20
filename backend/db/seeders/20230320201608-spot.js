'use strict';

const { Spot } = require('../models');

const spots = [
  {
    address: '1234 park haven',
    city: 'melbourne',
    state: 'kentucky',
    country: 'Canada',
    lat: 0.33,
    lng: 0.33,
    name: 'henry',
    description: 'this is a good spot',
    price: 2000.88
  },
  {
    address: '1234 park haven',
    city: 'melbourne',
    state: 'kentucky',
    country: 'Canada',
    lat: 0.33,
    lng: 0.33,
    name: 'henry',
    description: 'this is a good spot',
    price: 2000.88
  },
  {
    address: '1234 park haven',
    city: 'melbourne',
    state: 'kentucky',
    country: 'Canada',
    lat: 0.33,
    lng: 0.33,
    name: 'henry',
    description: 'this is a good spot',
    price: 2000.88
  },
  {
    address: '1234 park haven',
    city: 'melbourne',
    state: 'kentucky',
    country: 'Canada',
    lat: 0.33,
    lng: 0.33,
    name: 'henry',
    description: 'this is a good spot',
    price: 2000.88
  },
  {
    address: '1234 park haven',
    city: 'melbourne',
    state: 'kentucky',
    country: 'Canada',
    lat: 0.33,
    lng: 0.33,
    name: 'henry',
    description: 'this is a good spot',
    price: 2000.88
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
   await Spot.bulkCreate(spots)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Spots', null, {})
  }
};
