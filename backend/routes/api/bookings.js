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

        const previewImages = await SpotImage.findAll({
            where: {
                spotId: user.id
            }
        })

        bookingsList.forEach( booking => {
            delete booking.Spot.createdAt
            delete booking.Spot.updatedAt
            previewImages.forEach(image => {
                if(image.dataValues.preview === true) {
                    booking.Spot.previewImage = image.dataValues.url
                }
            })

        })

        res.json({Bookings: bookingsList})
    }
})

router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const {user} = req
    const {startDate, endDate} = req.body
    if (user) {
        const booking = await Booking.findByPk(req.params.bookingId)

        const startTime = new Date(startDate).getTime()
        const endTime = new Date(endDate).getTime()

        const currentTime = new Date().getTime()


        if(startTime > endTime) {
            const err = new Error("endDate cannot be on or before startDate")
            err.status = 400
            next(err)
        }

        if(!booking) {
            const err = new Error("Booking not found")
            err.status = 404
            next(err)
        }

        if(currentTime > endTime) {
            const err = new Error("Past bookings can't be modified")
            err.status = 403
            next(err)
        }

        if(user.dataValues.id === booking.dataValues.userId) {
            booking.startDate = startDate
            booking.endDate = endDate

            await booking.save()

            return res.json(booking)
        }
    }
    return res.json({message: "Authentication Required"})
})

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const {user} = req
    if(user) {
        const startTime = new Date(startDate).getTime()
        const endTime = new Date(endDate).getTime()
        const currentTime = new Date().getTime()

        const booking = await Booking.findByPk(req.params.bookingId)

        if(!booking) {
            const err = new Error("Booking not found")
            err.status = 404
            next(err)
        }

        if(currentTime > startTime) {
            const err = new Error("Bookings that have been started can't be deleted")
            err.status = 403
            next(err)
        }

        if(user.dataValues.id === booking.dataValues.userId || user.dataValues.id === booking.dataValues.spotId) {
            await booking.destroy()

            return res.json({message: "Successfully deleted"})
        }
    }
    return res.json({message: "Authentication Required"})
})


module.exports = router;
