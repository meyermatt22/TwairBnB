const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, Review, ReviewImage, Spot, SpotImage, User, Index } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { where } = require('sequelize');


router.get('/current', requireAuth, async (req, res, next) => {
    const {user} = req
    if(user) {
        const bookings = await Booking.findAll({
            where: {
                userId: user.id
            },
            include: [
                {
                    model: Spot
                }
            ]
        })

        let bookingsList = [];

        bookings.forEach(booking => {
            bookingsList.push(booking.toJSON())
        });

        bookingsList.forEach( booking => {
            delete booking.Spot.createdAt
            delete booking.Spot.updatedAt
            // console.log('here please: ', booking.Spot)
        })

        res.json(bookingsList)
    }
})



module.exports = router;
