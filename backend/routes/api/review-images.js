const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, Review, ReviewImage, Spot, SpotImage, User, Index } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { where } = require('sequelize');


router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const {user} = req
    if(user) {
        const image = await ReviewImage.findByPk(req.params.imageId)

        if(!image) {
            return res.status(404).json({message: "Image not found"})
        }
        if(user.dataValues.id === image.dataValues.reviewId) {
            await image.destroy()

            return res.json({message: "Successfully deleted"})
        }

    }
    return res.status(403).json({message: "Review must belong to the current user"})
})





module.exports = router;
