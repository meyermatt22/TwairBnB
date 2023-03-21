'use strict';

const bcrypt = require("bcryptjs")

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

   options.tableName = "Spots";
   return queryInterface.bulkInsert(options, [
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
  ], {})
  },

  async down (queryInterface, Sequelize) {
    
    options.tableName = 'Spots'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['1234 park haven'] }
    }, {})
  }
};
