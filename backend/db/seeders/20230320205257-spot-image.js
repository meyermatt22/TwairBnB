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
        preview: false,
        spotId: 3
      },
      {
      url: 'https://i.imgur.com/hKimbER.jpg',
      preview: false,
      spotId: 3
    },
    {
      url: 'https://i.imgur.com/uJBQnxS.jpg',
      preview: false,
      spotId: 3
    },
    {
      url: 'https://i.imgur.com/WulZkLi.jpg',
      preview: false,
      spotId: 3
    },
    {
      url: 'https://i.imgur.com/U6y4KyX.jpg',
      preview: true,
      spotId: 1
    },
    {
      url: 'https://i.imgur.com/XVgwV6U.jpg',
      preview: false,
      spotId: 1
    },
    {
      url: 'https://i.imgur.com/Y2hr41A.jpg',
      preview: false,
      spotId: 1
    },
    {
      url: 'https://i.imgur.com/TDZOYFH.jpg',
      preview: false,
      spotId: 1
    },
    {
      url: 'https://i.imgur.com/5QKjszA.jpg',
      preview: false,
      spotId: 1
    },
    {
      url: 'https://i.imgur.com/ePKn0wx.jpg',
      preview: true,
      spotId: 4
    },
    {
      url: 'https://i.imgur.com/A5dQdE6.jpg',
      preview: false,
      spotId: 4
    },
    {
      url: 'https://i.imgur.com/2MQobFw.jpg',
      preview: false,
      spotId: 4
    },
    {
      url: 'https://i.imgur.com/QdTNNRS.jpg',
      preview: false,
      spotId: 4
    },
    {
      url: 'https://i.imgur.com/EAhScc1.jpg',
      preview: false,
      spotId: 4
    },
    {
      url: 'https://i.imgur.com/rFf1Cto.jpg',
      preview: true,
      spotId: 2
    },
    {
      url: 'https://i.imgur.com/sPxTyS6.jpg',
      preview: false,
      spotId: 2
    },
    {
      url: 'https://i.imgur.com/tGi2urv.jpg',
      preview: false,
      spotId: 2
    },
    {
      url: 'https://i.imgur.com/Sj749VT.jpg',
      preview: false,
      spotId: 2
    },
    {
      url: 'https://i.imgur.com/Jt5pZyt.jpg',
      preview: false,
      spotId: 2
    },
    {
      url: 'https://i.imgur.com/vX6c99k.jpg',
      preview: true,
      spotId: 5
    },
    {
      url: 'https://i.imgur.com/lHczcvC.jpg',
      preview: false,
      spotId: 5
    },
    {
      url: 'https://i.imgur.com/XimwQVz.jpg',
      preview: false,
      spotId: 5
    },
    {
      url: 'https://i.imgur.com/39c0UOv.jpg',
      preview: false,
      spotId: 5
    },
    {
      url: 'https://i.imgur.com/0ZLvVSv.jpg',
      preview: false,
      spotId: 5
    },
    {
      url: 'https://i.imgur.com/z3RCPEq.jpg',
      preview: true,
      spotId: 6
    },
    {
      url: 'https://i.imgur.com/FgqRrWR.jpg',
      preview: false,
      spotId: 6
    },
    {
      url: 'https://i.imgur.com/rynd5f2.jpg',
      preview: false,
      spotId: 6
    },
    {
      url: 'https://i.imgur.com/KtSsLSa.jpg',
      preview: false,
      spotId: 6
    },
    {
      url: 'https://i.imgur.com/NaN13e7.jpg',
      preview: false,
      spotId: 6
    },
    {
      url: 'https://i.imgur.com/bCnUXBT.jpg',
      preview: true,
      spotId: 7
    },
    {
      url: 'https://i.imgur.com/yREx3Ag.jpg',
      preview: false,
      spotId: 7
    },
    {
      url: 'https://i.imgur.com/BR38CLv.jpg',
      preview: false,
      spotId: 7
    },
    {
      url: 'https://i.imgur.com/TTuH2TO.jpg',
      preview: false,
      spotId: 7
    },
    {
      url: 'https://i.imgur.com/5Z7ew0T.jpg',
      preview: false,
      spotId: 7
    },
    {
      url: 'https://i.imgur.com/Sk5p9fb.jpg',
      preview: true,
      spotId: 8
    },
    {
      url: 'https://i.imgur.com/6RujtR3.jpg',
      preview: false,
      spotId: 8
    },
    {
      url: 'https://i.imgur.com/m5rFLRy.jpg',
      preview: false,
      spotId: 8
    },
    {
      url: 'https://i.imgur.com/JYp8Gtn.jpg',
      preview: false,
      spotId: 8
    },
    {
      url: 'https://i.imgur.com/8COI1rL.jpg',
      preview: false,
      spotId: 8
    },
    {
      url: 'https://i.imgur.com/7YJ9QRT.jpg',
      preview: true,
      spotId: 9
    },
    {
      url: 'https://i.imgur.com/v3xA6Y6.jpg',
      preview: false,
      spotId: 9
    },
    {
      url: 'https://i.imgur.com/cxJKpyq.jpg',
      preview: false,
      spotId: 9
    },
    {
      url: 'https://i.imgur.com/hrOh5PL.jpg',
      preview: false,
      spotId: 9
    },
    {
      url: 'https://i.imgur.com/1Le37r5.jpg',
      preview: false,
      spotId: 9
    },
  ], {})
},

async down (queryInterface, Sequelize) {

  options.tableName = "SpotImages"
  const Op = Sequelize.Op;
  return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3,4,5,6,7,8,9,10,11,12]}
    }, {});
  }
};
