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


module.exports = router;
