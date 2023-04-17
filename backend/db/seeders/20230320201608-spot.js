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
      address: '635 Avenue de Los Mexicanos',
      city: 'South Park',
      state: 'Colorado',
      country: 'United States',
      lat: 0.33,
      lng: 0.33,
      name: 'Kennys House',
      description: 'The McCormicks House is very bare with a minimal amount of furniture and luxuries. They do have a computer maintaining a World of Warcraft subscription, a Sony PSP console and a black-and-white TV with a ColecoVision (although it has been seen to show in colour in "Poor and Stupid").',
      price: 24.99,
      ownerId: 1
    },
    {
      address: 'West 57th Street and, most likely, Henry Hudson Parkway',
      city: 'Manhatten',
      state: 'New New York',
      country: 'United States',
      lat: 0.33,
      lng: 0.33,
      name: 'Planet Express',
      description: 'What is Planet Express? Planet Express is a package forwarding company that helps online shoppers who face problems during shopping because they dont live in the US or the UK. It gives them a US or UK address to send their shipments to or shops on their behalf and then forwards their packages to anywhere they like.',
      price: 2000.88,
      ownerId: 2
    },
    {
      address: 'Bag End',
      city: 'Arda',
      state: 'Hobbiton',
      country: 'The Shire',
      lat: 0.33,
      lng: 0.33,
      name: 'henry',
      description: 'Bag End is a smial situated at the end of Bagshot Row in Hobbiton. It was the home of Bilbo Baggins, afterwards of Frodo Baggins, and later of Samwise Gamgee and his wife Rosie Cotton.',
      price: 2000.88,
      ownerId: 3
    },
    {
      address: '1 Rainbow Road',
      city: 'Wonju',
      state: 'Dazed',
      country: 'Japan',
      lat: 0.33,
      lng: 0.33,
      name: 'Peaches Castle',
      description: 'Peachs Castle (also known as Princess Peachs Castle or the Mushroom Castle) is the castle situated within the Mushroom Kingdom and its most prominent landmark. It is home to Princess Peach, as well as many Toads, including Toad and Toadsworth.',
      price: 2000.88,
      ownerId: 4
    },
    {
      address: '123 Rainey street',
      city: 'melbourne',
      state: 'kentucky',
      country: 'Canada',
      lat: 0.33,
      lng: 0.33,
      name: 'The Hills Residence',
      description: 'The house was built sometime between the 1920s and the 1950s by T. Anderson Kearney (descendant of the Texas Revolution hero, hero of the Battle of Gonzales). At some point, the Wakefield family moved into the house, at a point when Ms. Wakefield (a senior citizen) would have been a child; by the mid-1980s one of the Wakefield daughters will have died in the house, and the rest of the family will have moved out. In the mid-to-late-1980s the Hills bought the residence.',
      price: 2000.88,
      ownerId: 5
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
