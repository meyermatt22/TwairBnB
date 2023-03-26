const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { where } = require('sequelize');

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];


// Sign up
// router.post('/', validateSignup, async (req, res) => {
//   // console.log("**$%^** LOOK AT ME look look **$%*", User.email)

//   const { email, password, username, firstName, lastName } = req.body;
//   const hashedPassword = bcrypt.hashSync(password);
//   const userEmail = await User.findOne( {where: email} )
//     // console.log('&& LOOK HERE &&', user)
//   if (userEmail) {
//     return res.json({
//       "message": "User already exists",
//       "errors": {
//         "email": "User with that email already exists"
//       }
//     });
//   }
//   const userName = await User.findOne( {where: username})

//   if (userName) {
//     return res.json({
//       "message": "User already exists",
//       "errors": {
//         "username": "User with that username already exists"
//       }
//     })
//   }

//   const user = await User.create({ email, username, firstName, lastName, hashedPassword });

//       const safeUser = {
//         id: user.id,
//         email: user.email,
//         username: user.username,
//         firstName: user.firstName,
//         lastName: user.lastName
//       };

//       await setTokenCookie(res, safeUser);

//       return res.json({
//         user: safeUser
//       });
//     }
//   );

router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, hashedPassword, firstName, lastName });

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    };

    await setTokenCookie(res, safeUser);

    return res.json(safeUser);
  }
);

module.exports = router;
