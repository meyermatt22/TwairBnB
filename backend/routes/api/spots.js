const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, Review, ReviewImage, Spot, SpotImage, User, Index } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { where } = require('sequelize');
const spot = require('../../db/models/spot');


router.get('/', async(req, res) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]
    })

    let spotsList = [];
    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    });

    spotsList.forEach(spot => {

        spot.SpotImages.forEach(image => {
            if(image.preview === true) {
                // console.log('image ', image)
                spot.previewImage = image.url
            } else {
                spot.previewImage = 'No image URL found'
            }
        })

        let total = 0
        spot.Reviews.forEach(reviewy => {
            console.log(reviewy)
            total += reviewy.stars
        })
        spot.avgRating = total / spot.Reviews.length
        // console.log('spoty',spot)
        delete spot.Reviews
        delete spot.SpotImages

    })

    res.json(spotsList)
})

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req

    if(user) {

            const spots = await Spot.findAll({
                where: {
                    ownerId: user.id
                },
                include: [
                    {
                        model: Review
                    },
                    {
                        model: SpotImage
                    }
                ]
            })
            let spotsList = [];

            spots.forEach(spot => {
                spotsList.push(spot.toJSON())
            })

            spotsList.forEach(spot => {

                spot.SpotImages.forEach(image => {
                    if(image.preview === true) {
                        // console.log('image ', image)
                        spot.previewImage = image.url
                    } else {
                        spot.previewImage = 'No image URL found'
                    }
                })

                let total = 0
                spot.Reviews.forEach(reviewy => {
                    console.log(reviewy)
                    total += reviewy.stars
                })
                spot.avgRating = total / spot.Reviews.length
                // console.log('spoty',spot)

                delete spot.Reviews
                delete spot.SpotImages

            })

            const spotsListed = { Spots:  spotsList  }

            res.json(spotsListed)


    }
})

router.get('/:spotId', async (req, res) => {
    // const spot = await Spot.findByPk(req.params.spotId)

    const spot = await Spot.findAll({
        where: {ownerId: req.params.spotId},
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            },
        ]
    })
    const spotOwner = await User.findByPk(req.params.spotId)
    // console.log('owner: ',spotOwner.firstName)



    let spotsList = [];
    spot.forEach(spot => {
        spotsList.push(spot.toJSON())
    });

    spotsList.forEach(spot => {

        if(spot.Owner) {
            spot.Owner = {
                id: spotOwner.id,
                firstName: spotOwner.firstName,
                lastName: spotOwner.lastName
            }
        } else {
            spot.Owner = "No Owner Found"
        }

        let total = 0
        spot.Reviews.forEach(reviewy => {
            // console.log(reviewy)
            total += reviewy.stars
        })
        spot.avgStarRating = total / spot.Reviews.length
        // console.log('spoty',spot)
        spot.numReviews = spot.Reviews.length

        spot.SpotImages.forEach(image => {
            delete image.spotId
            delete image.createdAt
            delete image.updatedAt
        })

        delete spot.Reviews
    })
    res.json(spotsList)
})

router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price, ownerId } = req.body;
    const spot = await Spot.create({ address, city, state, country, lat, lng, name, description, price, ownerId })

    return res.json(spot)
})

router.post('/:spotId/images', requireAuth, async (req, res, next) => {


    const { url, preview } = req.body
    const {user} = req

    if (user) {
        const spot = await Spot.findByPk(req.params.spotId);

        if (!spot) {
            const err = new Error("Spot not found")
            err.status = 404
            next(err)
        }

        if(user.dataValues.id === spot.dataValues.ownerId) {

            const imagey = await spot.createSpotImage({
                url: url,
                preview: preview
            })

            return res.json({
                id: imagey.id,
                url: imagey.url,
                preview: imagey.preview
            })
        }

        return res.status(403).json({
            "message": "Forbidden"
        })
    }
    return res.json({
        message: "Authentication required"
    })
})

router.put('/:spotId', requireAuth, async (req, res, next) => {
    const { user } = req
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    if(user) {
        const spot = await Spot.findByPk(req.params.spotId)

        if (!spot) {
            const err = new Error("Spot not found")
            err.status = 404
            next(err)
        }

        spot.address = address
        spot.city = city
        spot.state = state
        spot.counrty = country
        spot.lat = lat
        spot.lng = lng
        spot.name = name
        spot.description = description
        spot.price = price

        await spot.save()

        return res.json(spot)
    }
})

router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const { user } = req

    if(user) {
        const spot = await Spot.findByPk(req.params.spotId)

        if (!spot) {
            const err = new Error("Spot not found")
            err.status = 404
            next(err)
        }

        // console.log(spot)
        await spot.destroy()

        return res.json({ message: "Successfully deleted"})
    }

})


router.get('/:spotId/reviews', async (req, res, next) => {

    const { user } = req
    // console.log('user: ' , user)
    // console.log('params',  req.params)
    const {spotId} = req.params

    if(user) {

        const oneSpotsReviews = await Review.findOne({
            where: {
                id: spotId
            },
            include: [
                {
                    model:User
                },
                {
                    model: ReviewImage
                }
            ]
        })

        if (!oneSpotsReviews) {
            const err = new Error("Spot not found")
            err.status = 404
            next(err)
        }


        if (oneSpotsReviews.User) {
            delete oneSpotsReviews.User.dataValues.username
        }

        // delete oneSpotsReviews.ReviewImages[0].reviewId
        oneSpotsReviews.ReviewImages.forEach( reviewimage => {
            // console.log(reviewimage.dataValues.reviewId)
            delete reviewimage.dataValues.reviewId
            delete reviewimage.dataValues.createdAt
            delete reviewimage.dataValues.updatedAt
        })
        // console.log('list here: ', oneSpotsReviews.User.dataValues.username)
        const result = { Reviews: [oneSpotsReviews] }

        res.json(result)
    }

})

router.post('/:spotId/reviews', requireAuth, async(req, res, next) => {
    const { user } = req
    const {review, stars} = req.body

    if(user) {
        const spot = await Spot.findByPk(req.params.spotId)

        if (!spot) {
            const err = new Error("Spot not found")
            err.status = 404
            next(err)
        }

        if(user.dataValues.id === spot.dataValues.ownerId) {
            const newReview = await spot.createReview({
                review: review,
                stars: stars
            })
            return res.json({
                id: newReview.id,
                review: newReview.review,
                stars: newReview.stars,
                userId: user.dataValues.id,
                spotId: spot.dataValues.id,
                createdAt: newReview.createdAt,
                updatedAt: newReview.updatedAt
            })

        }

    }
    return res.json({ message: "Authentication Required"})
})

router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const {user} = req
    const {spotId} = req.params
    if(user) {
        const spot = await Spot.findByPk(req.params.spotId)

        if (!spot) {
            const err = new Error("Spot not found")
            err.status = 404
            next(err)
        }

        const bookings = await Booking.findAll({
            where: {
                userId: spotId
            },
            include: [
                {
                    model: User
                }
            ]
        })


        let bookingsList = []
        bookings.forEach(booking => {
            bookingsList.push(booking.toJSON())
        })

        bookingsList.forEach(booking => {

            if(booking.userId === user.id) {
                delete User.username

                return res.json({Bookings: bookingsList})
            }
            delete booking.User
            delete booking.userId
            delete booking.createdAt
            delete booking.id
            delete booking.updatedAt
        })

        let nonOwnerResult = { Bookings: bookingsList }

        return res.json(nonOwnerResult)
    }
    return res.json({ message: "Authentication Required"})
})

router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const {user} = req
    const { startDate, endDate } = req.body
    if(user) {

        const spot = await Spot.findByPk(req.params.spotId)

        if (!spot) {
            const err = new Error("Spot not found")
            err.status = 404
            next(err)
        }

        if(user.dataValues.id === spot.dataValues.ownerId) {
            const err = new Error("Bookings can not be made to spots you own")
            next(err)
        }

        const newBooking = await spot.createBooking({
            startDate: startDate,
            endDate: endDate
        })

        await spot.save()

        return res.json({
            id: newBooking.id,
            spotId: newBooking.spotId,
            userId: newBooking.userId,
            startDate: newBooking.startDate,
            endDate: newBooking.endDate,
            createdAt: newBooking.createdAt,
            updatedAt: newBooking.updatedAt
        })
    }
    return res.json({ message: "Authentication Required"})
})

module.exports = router;
