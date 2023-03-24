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
        const image = await SpotImage.findByPk(req.params.imageId)

        if(!image) {
            const err = new Error("Image not found")
            err.status = 404
            next(err)
        }
        if(user.dataValues.id === image.dataValues.spotId) {
            await image.destroy()

            return res.json({message: "Successfully deleted"})
        }

    }
    return res.json({message: "Authentication Required"})
})





module.exports = router;
