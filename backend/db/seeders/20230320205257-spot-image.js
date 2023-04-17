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
       url: 'https://i.imgur.com/fywlFjC.jpg',
       preview: true,
       spotId: 3
      },
      {
        url: 'https://i.imgur.com/gXC0USv.jpg',
        preview: true,
        spotId: 3
      },
      {
      url: 'https://i.imgur.com/hKimbER.jpg',
      preview: true,
      spotId: 3
    },
    {
      url: 'https://i.imgur.com/uJBQnxS.jpg',
      preview: true,
      spotId: 3
    },
    {
      url: 'https://i.imgur.com/WulZkLi.jpg',
      preview: true,
      spotId: 3
    },
    {
      url: 'https://i.imgur.com/U6y4KyX.jpg',
      preview: true,
      spotId: 1
    },
    {
      url: 'https://i.imgur.com/XVgwV6U.jpg',
      preview: true,
      spotId: 1
    },
    {
      url: 'https://i.imgur.com/Y2hr41A.jpg',
      preview: true,
      spotId: 1
    },
    {
      url: 'https://i.imgur.com/TDZOYFH.jpg',
      preview: true,
      spotId: 1
    },
    {
      url: 'https://i.imgur.com/5QKjszA.jpg',
      preview: true,
      spotId: 1
    },
    {
      url: 'https://i.imgur.com/ePKn0wx.jpg',
      preview: true,
      spotId: 4
    },
    {
      url: 'https://i.imgur.com/A5dQdE6.jpg',
      preview: true,
      spotId: 4
    },
    {
      url: 'https://i.imgur.com/2MQobFw.jpg',
      preview: true,
      spotId: 4
    },
    {
      url: 'https://i.imgur.com/QdTNNRS.jpg',
      preview: true,
      spotId: 4
    },
    {
      url: 'https://i.imgur.com/EAhScc1.jpg',
      preview: true,
      spotId: 4
    },
    {
      url: 'https://i.imgur.com/rFf1Cto.jpg',
      preview: true,
      spotId: 2
    },
    {
      url: 'https://i.imgur.com/sPxTyS6.jpg',
      preview: true,
      spotId: 2
    },
    {
      url: 'https://i.imgur.com/tGi2urv.jpg',
      preview: true,
      spotId: 2
    },
    {
      url: 'https://i.imgur.com/Sj749VT.jpg',
      preview: true,
      spotId: 2
    },
    {
      url: 'https://i.imgur.com/Jt5pZyt.jpg',
      preview: true,
      spotId: 2
    },
    {
      url: 'https://i.imgur.com/vX6c99k.jpg',
      preview: true,
      spotId: 5
    },
    {
      url: 'https://i.imgur.com/lHczcvC.jpg',
      preview: true,
      spotId: 5
    },
    {
      url: 'https://i.imgur.com/XimwQVz.jpg',
      preview: true,
      spotId: 5
    },
    {
      url: 'https://i.imgur.com/39c0UOv.jpg',
      preview: true,
      spotId: 5
    },
    {
      url: 'https://i.imgur.com/0ZLvVSv.jpg',
      preview: true,
      spotId: 5
    },
  ], {})
},

async down (queryInterface, Sequelize) {

  options.tableName = "SpotImages"
  const Op = Sequelize.Op;
  return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3,4,5]}
    }, {});
  }
};
