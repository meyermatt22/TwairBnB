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
    {
      url: 'https://i.imgur.com/z3RCPEq.jpg',
      preview: true,
      spotId: 6
    },
    {
      url: 'https://i.imgur.com/FgqRrWR.jpg',
      preview: true,
      spotId: 6
    },
    {
      url: 'https://i.imgur.com/rynd5f2.jpg',
      preview: true,
      spotId: 6
    },
    {
      url: 'https://i.imgur.com/KtSsLSa.jpg',
      preview: true,
      spotId: 6
    },
    {
      url: 'https://i.imgur.com/NaN13e7.jpg',
      preview: true,
      spotId: 6
    },
    {
      url: 'https://i.imgur.com/bCnUXBT.jpg',
      preview: true,
      spotId: 7
    },
    {
      url: 'https://i.imgur.com/yREx3Ag.jpg',
      preview: true,
      spotId: 7
    },
    {
      url: 'https://i.imgur.com/BR38CLv.jpg',
      preview: true,
      spotId: 7
    },
    {
      url: 'https://i.imgur.com/TTuH2TO.jpg',
      preview: true,
      spotId: 7
    },
    {
      url: 'https://i.imgur.com/5Z7ew0T.jpg',
      preview: true,
      spotId: 7
    },
    {
      url: 'https://i.imgur.com/Sk5p9fb.jpg',
      preview: true,
      spotId: 8
    },
    {
      url: 'https://i.imgur.com/6RujtR3.jpg',
      preview: true,
      spotId: 8
    },
    {
      url: 'https://i.imgur.com/m5rFLRy.jpg',
      preview: true,
      spotId: 8
    },
    {
      url: 'https://i.imgur.com/JYp8Gtn.jpg',
      preview: true,
      spotId: 8
    },
    {
      url: 'https://i.imgur.com/8COI1rL.jpg',
      preview: true,
      spotId: 8
    },
    {
      url: 'https://i.imgur.com/7YJ9QRT.jpg',
      preview: true,
      spotId: 9
    },
    {
      url: 'https://i.imgur.com/v3xA6Y6.jpg',
      preview: true,
      spotId: 9
    },
    {
      url: 'https://i.imgur.com/cxJKpyq.jpg',
      preview: true,
      spotId: 9
    },
    {
      url: 'https://i.imgur.com/hrOh5PL.jpg',
      preview: true,
      spotId: 9
    },
    {
      url: 'https://i.imgur.com/1Le37r5.jpg',
      preview: true,
      spotId: 9
    },
    {
      url: 'https://i.imgur.com/rqlZV9x.jpg',
      preview: true,
      spotId: 10
    },
    {
      url: 'https://i.imgur.com/sbOz4Ri.jpg',
      preview: true,
      spotId: 10
    },
    {
      url: 'https://i.imgur.com/SmOyvWz.jpg',
      preview: true,
      spotId: 10
    },
    {
      url: 'https://i.imgur.com/enSZi2x.jpg',
      preview: true,
      spotId: 10
    },
    {
      url: 'https://i.imgur.com/oYOlgpH.jpg',
      preview: true,
      spotId: 10
    },
    {
      url: 'https://i.imgur.com/fe3Ij0f.jpg',
      preview: true,
      spotId: 11
    },
    {
      url: 'https://i.imgur.com/4rzW4dD.jpg',
      preview: true,
      spotId: 11
    },
    {
      url: 'https://i.imgur.com/EkGNE1x.jpg',
      preview: true,
      spotId: 11
    },
    {
      url: 'https://i.imgur.com/RzIlenR.jpg',
      preview: true,
      spotId: 11
    },
    {
      url: 'https://i.imgur.com/7vsWlNu.jpg',
      preview: true,
      spotId: 11
    },
    {
      url: 'https://i.imgur.com/yVwq1nu.jpg',
      preview: true,
      spotId: 12
    },
    {
      url: 'https://i.imgur.com/FZtDRCt.jpg',
      preview: true,
      spotId: 12
    },
    {
      url: 'https://i.imgur.com/FvhRT0X.jpg',
      preview: true,
      spotId: 12
    },
    {
      url: 'https://i.imgur.com/t36PZMQ.jpg',
      preview: true,
      spotId: 12
    },
    {
      url: 'https://i.imgur.com/O70W9Hw.jpg',
      preview: true,
      spotId: 12
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
