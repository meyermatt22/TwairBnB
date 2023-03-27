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

        let errors = {}

        const booking = await Booking.findByPk(req.params.bookingId)

        const startTime = new Date(startDate).getTime()
        const endTime = new Date(endDate).getTime()
        const currentTime = new Date().getTime()


        if(startTime > endTime) {
            errors.message = "endDate cannot be on or before startDate"
        }

        if(!booking) {
            errors.message = "Booking not found"
        }

        if(currentTime > endTime) {
            errors.message = "Past bookings can't be modified"
        }

        const bookings = await Booking.findAll({
            where: {
                spotId: user.id
            }
        })

        bookings.forEach(booking => {

            if(startTime >= booking.dataValues.startDate.getTime() && startTime <= booking.dataValues.endDate.getTime()) {
                errors.message = "Sorry, this spot is already booked for the specified dates"
            }
        })

        if(Object.keys(errors).length) {
            res.status(403)
            return res.json({message: "bad request", errors:errors})
        }

        if(user.dataValues.id === booking.dataValues.userId) {
            booking.startDate = startDate
            booking.endDate = endDate

            await booking.save()

            return res.json(booking)
        }
    }
    return res.status(403).json({message: "You may only edit Bookings that belong to you"})
})

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const {user} = req
    if(user) {
        const booking = await Booking.findByPk(req.params.bookingId)

        let errors = {}
        if(!booking) {
            return res.status(404).json({message: "Booking not found"})
        }


        const startTime = new Date(booking.dataValues.startDate).getTime()
        const endTime = new Date(booking.dataValues.endDate).getTime()
        const currentTime = new Date().getTime()

        if(currentTime > startTime) {
            errors.message = "Bookings that have been started can't be deleted"
        }

        if(Object.keys(errors).length) {
            res.status(403)
            return res.json({message: "bad request", errors:errors})
        }

        if(user.dataValues.id === booking.dataValues.userId || user.dataValues.id === booking.dataValues.spotId) {
            await booking.destroy()

            return res.json({message: "Successfully deleted"})
        }
    }
    return res.status(403).json({message: "Booking must belong to the current user"})
})


module.exports = router;
