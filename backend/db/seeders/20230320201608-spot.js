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
      name: "Kenny's House",
      description: "The McCormicks' House is very bare with a minimal amount of furniture and luxuries. They do have a computer maintaining a World of Warcraft subscription.",
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
      description: 'What is Planet Express? Planet Express is a package forwarding company.',
      price: 1999999.99,
      ownerId: 2
    },
    {
      address: 'Bag End',
      city: 'Arda',
      state: 'Hobbiton',
      country: 'The Shire',
      lat: 0.33,
      lng: 0.33,
      name: 'Hobbit Hole',
      description: 'Bag End is a smial situated at the end of Bagshot Row in Hobbiton. It was the home of Bilbo Baggins, afterwards of Frodo Baggins, and later of Samwise Gamgee and his wife Rosie Cotton.',
      price: 111.33,
      ownerId: 3
    },
    {
      address: '1 Rainbow Road',
      city: 'Kingdom',
      state: 'Mushroom',
      country: 'Japan',
      lat: 0.33,
      lng: 0.33,
      name: "Peach's Castle",
      description: "Peach's Castle (also known as Princess Peach's Castle or the Mushroom Castle) is the castle situated within the Mushroom Kingdom and its most prominent landmark.",
      price: 1983.00,
      ownerId: 4
    },
    {
      address: '123 Rainey street',
      city: 'Arlen',
      state: 'Texas',
      country: 'United States',
      lat: 0.33,
      lng: 0.33,
      name: "The Hills' Residence",
      description: 'The house was built sometime between the 1920s and the 1950s by T. Anderson Kearney (descendant of the Texas Revolution hero, hero of the Battle of Gonzalez.',
      price: 86.45,
      ownerId: 5
    },
    {
      address: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'Oregon',
      country: 'United States',
      lat: 0.33,
      lng: 0.33,
      name: "The Simpsons' Residence",
      description: "Despite its dilapidated appearance, the Simpsons' four-bedroom abode is surprisingly structurally sound: when a hurricane passed through the town of Springfield, 742 remained standing while 744 was completely destroyed.",
      price: 94.95,
      ownerId: 6
    },
    {
      address: 'Apartment 5A, 129 West 81st Street',
      city: 'New York',
      state: 'New York',
      country: 'United States',
      lat: 0.33,
      lng: 0.33,
      name: "Jerry's place",
      description: "Jerry Seinfeld's apartment on New York's Upper West Side, with its purple walls and sky blue couches, was the place where ... nothing much happened.",
      price: 145.45,
      ownerId: 6
    },
    {
      address: '1882 Gerard Street',
      city: 'San Francisco',
      state: 'California',
      country: 'United States',
      lat: 0.33,
      lng: 0.33,
      name: "The Tanners' Residence",
      description: "The Tanner family's three-bed, three-bath San Francisco detached home was the place where Jesse and Joey helped Danny Tanner to raise his three daughters: D.J., Stephanie and Michelle.",
      price: 234.54,
      ownerId: 6
    },
    {
      address: '508 Saint Cloud Road',
      city: 'Bel Air',
      state: 'California',
      country: 'United States',
      lat: 0.33,
      lng: 0.33,
      name: "The Banks' Residence",
      description: "Every prince needs his castle and for Philadelphia-born Will Smith (played by, you guessed it, Will Smith) 508 Saint Cloud Road was where he came to sit on his throne as the Fresh Prince of Bel Air.",
      price: 847.56,
      ownerId: 6
    },
    {
      address: '7 Gordon Street',
      city: 'Camberwell',
      state: 'Melbourne',
      country: 'Australia',
      lat: 0.33,
      lng: 0.33,
      name: "The Sullivans' Residence",
      description: "The Sullivans' weatherboard villa in Melbourne's Camberwell was actually a house located three kilometres away in the suburb of Canterbury.",
      price: 48.99,
      ownerId: 6
    },
    {
      address: '4222 Clinton Way',
      city: 'Los Angeles',
      state: 'California',
      country: 'United States',
      lat: 0.33,
      lng: 0.33,
      name: "The Bradys' Residence",
      description: "The family of a man named Brady and a lovely lady lived at 4222 Clinton Way.",
      price: 92.33,
      ownerId: 6
    },
    {
      address: "345 Cave Stone Road",
      city: 'Gravel',
      state: 'Bedrock',
      country: 'Prehistoria',
      lat: 0.33,
      lng: 0.33,
      name: "The Flintstones' Residence",
      description: "Fred Flintstone and his wife Wilma live next to Barney and Betty Rubble, in a one-storey abode with a large, grassy garden surrounded by palm trees. No word on how the grass stays that green in the middle of the desert.",
      price: 0.01,
      ownerId: 6
    },
  ], {})
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Spots'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["Kenny's House", 'Planet Express','Hobbit Hole',"Peach's Castle",
      "The Hills' Residence", "The Simpsons' Residence", "Jerry's place", "The Tanners' Residence",
      "The Banks' Residence", "The Sullivans' Residence", "The Bradys' Residence"] }
    }, {})
  }
};
