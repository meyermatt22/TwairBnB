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

                if(review.User) {
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


        let reviewsListed = { Reviews: reviewsList}

        res.json(reviewsListed)
    }

})

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const { user } = req
    const { url } = req.body
    if(user) {
        const review = await Review.findByPk(req.params.reviewId)

        if (!review) {
            return res.status(404).json({message: "Review not found"})
        }

        const reviewImages = await ReviewImage.findAll({
            where: {
                reviewId: review.id
            }
        })

        if(reviewImages.length >= 10) {
            return res.status(403).json({message: "Maximum number of images for this resource was reached"})
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
    return res.status(403).json({ message: "Review must belong to you"})
})

router.put('/:reviewId', requireAuth, async (req, res, next) => {
    const { user } = req
    const { review, stars} = req.body

    if(user) {
        const reviewy = await Review.findByPk(req.params.reviewId)

        if (!reviewy) {
            return res.status(404).json({message: "Review not found"})
        }
        if(user.dataValues.id === reviewy.dataValues.userId) {
            reviewy.review = review
            reviewy.stars = stars

            await reviewy.save()

            return res.json(reviewy)
        }
    }
    return res.status(403).json({ message: "Review must belong to you"})
})

router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const { user } = req
    if(user) {
        const review = await Review.findByPk(req.params.reviewId)

        if(!review) {
            return res.status(404).json({message: "Review not found"})
        }

        if(user.dataValues.id === review.dataValues.userId) {
            await review.destroy()

            return res.json({message: "Successfully deleted"})
        }
    }
    return res.status(403).json({ message: "Review must belong to you"})
})

module.exports = router;
