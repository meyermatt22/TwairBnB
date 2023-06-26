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
            name: {
                [Op.like]: '%' + searchedProp + '%'
            }
        },
    })
    console.log("====================>", spots)

    res.json(spots)
})



module.exports = router;
