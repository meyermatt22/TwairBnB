const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  Booking,
  Review,
  ReviewImage,
  Spot,
  SpotImage,
  User,
  Index,
} = require("../../db/models");

const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { where } = require("sequelize");
const spot = require("../../db/models/spot");
const user = require("../../db/models/user");
const { Op } = require("sequelize");


router.post("/", async (req, res) => {
    const { user } = req
    const { searchedProp, minPrice, maxPrice } = req.body

    console.log('look here ======> ', searchedProp)

    const spots = await Spot.findAll({
        include: [
            {
              model: Review,
            },
            {
              model: SpotImage,
            },
          ],
        where: {
            price: {
                [Op.between]: [minPrice, maxPrice],
            },
            [Op.or]: {
              country: {
                  [Op.iLike]: '%' + searchedProp + '%'
              },
              state: {
                  [Op.iLike]: '%' + searchedProp + '%'
              },
              city: {
                  [Op.iLike]: '%' + searchedProp + '%'
              },
            }
        },
    })

    res.json(spots)
})



module.exports = router;
