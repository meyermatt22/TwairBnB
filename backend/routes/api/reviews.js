const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, Review, ReviewImage, Spot, SpotImage, User, Index } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { where } = require('sequelize');

router.get('/current', requireAuth, async (req, res, next) => {

    const { user } = req

    if(user) {

        const reviews = await Review.findAll({
            where: {
                userId: user.id
            },
            include: [
                {
                    model: Spot
                },
                {
                    model: ReviewImage
                },
                {
                    model: User,
                }
            ]
        })

        let reviewsList = [];

        reviews.forEach(review => {
            reviewsList.push(review.toJSON())

        })

        reviewsList.forEach(review => {
            // if(review.User.id !== null && review.User.id === user.dataValues.id) {
                if(review.User) {
                    // console.log('looky looky i got a hooky: ',review.User.username)
                    delete review.User.username
                }
                if(review.ReviewImages) {
                    review.ReviewImages.forEach( review => {
                        delete review.reviewId
                        delete review.createdAt
                        delete review.updatedAt
                    })
                }
                if(review.Spot) {
                    delete review.Spot.createdAt
                    delete review.Spot.updatedAt
                }

        })


        reviewsListed = { Reviews: reviewsList}

        res.json(reviewsListed)
    }

})

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const { user } = req
    const { url } = req.body
    if(user) {
        const review = await Review.findByPk(req.params.reviewId)

        const reviewImages = await ReviewImage.findAll({
            where: {
                reviewId: review.id
            }
        })

        if(reviewImages.length >= 10) {
            const err = new Error("Maximum number of images for this resource was reached")
            err.status = 403
            next(err)
        }

        console.log('review: ', review)
        if(!review) {
            const err = new Error("Review not found")
            err.status = 404
            next(err)
        }

        if(user.dataValues.id === review.dataValues.userId) {
            const newImage = await review.createReviewImage({
                url: url
            })
            return res.json({
                id: newImage.id,
                url: newImage.url
            })
        }

    }
    return res.json({ message: "Authentication Required"})
})

router.put('/:reviewId', requireAuth, async (req, res, next) => {
    const { user } = req
    const { review, stars} = req.body

    if(user) {
        const reviewy = await Review.findByPk(req.params.reviewId)

        if (!reviewy) {
            const err = new Error("Review not found")
            err.status = 404
            next(err)
        }

        reviewy.review = review
        reviewy.stars = stars

        await reviewy.save()

        return res.json(reviewy)
    }
    return res.json({ message: "Authentication Required"})
})

module.exports = router;
