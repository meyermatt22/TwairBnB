'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/* @type {import('sequelize-cli').Migration} */
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
   options.tableName = 'Users';
   return queryInterface.bulkInsert(options, [
    {
      email: 'demo1@user.io',
      username: 'fake-user1',
      hashedPassword: bcrypt.hashSync('password1'),
      firstName: "hohoheyhey",
      lastName: "whatwhere"
    },
    {
      email: 'demo2@user.io',
      username: 'fake-user2',
      hashedPassword: bcrypt.hashSync('password2'),
      firstName: "hohoheyheyy",
      lastName: "whatwhere"
    },
    {
      email: 'demo3@user.io',
      username: 'fake-user3',
      hashedPassword: bcrypt.hashSync('password3'),
      firstName: "hohoheyheyyy",
      lastName: "whatwhere"
    }
   ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['fake-user1', 'fake-user2', 'fake-user3']}
    })
  }
};
