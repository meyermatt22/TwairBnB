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

router.get("/", async (req, res, next) => {
  let { page, size } = req.query;

  let errors = {};

  if (!page) {
    page = 1;
  }
  if (page < 1) {
    errors.page = "Page must be greater than or equal to 1";
  }
  if (!size) {
    size = 20;
  }
  if (size < 1) {
    errors.size = "Size must be greater than or equal to 1";
  }

  if (Object.keys(errors).length) {
    res.status(400);
    return res.json({ message: "bad request", errors: errors });
  }

  const startIndex = (page - 1) * size;
  const endIndex = page * size;

  const spots = await Spot.findAll({
    include: [
      {
        model: Review,
      },
      {
        model: SpotImage,
      },
    ],
    page,
    size,
  });

  let spotsList = [];
  spots.forEach((spot) => {
    spotsList.push(spot.toJSON());
  });

  spotsList.forEach((spot) => {
    spot.SpotImages.forEach((image) => {
      if (image.preview === true) {
        spot.previewImage = image.url;
      } else {
        spot.previewImage = "No image URL found";
      }
    });

    let total = 0;
    spot.Reviews.forEach((review) => {
      total += review.stars;
    });

    spot.avgRating = Math.round(
      ((total / spot.Reviews.length) * 100) / 100
    ).toFixed(2);

    delete spot.Reviews;
    delete spot.SpotImages;
  });

  const results = spotsList.slice(startIndex, endIndex);

  return res.json({ Spots: results, page, size });
});

router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;

  if (user) {
    const spots = await Spot.findAll({
      where: {
        ownerId: user.id,
      },
      include: [
        {
          model: Review,
        },
        {
          model: SpotImage,
        },
      ],
    });
    let spotsList = [];
    spots.forEach((spot) => {
      spotsList.push(spot.toJSON());
    });
    spotsList.forEach((spot) => {
      spot.SpotImages.forEach((image) => {
        if (image.preview === true) {
          spot.previewImage = image.url;
        } else {
          spot.previewImage = "No image URL found";
        }
      });
      let total = 0;
      spot.Reviews.forEach((review) => {
        total += review.stars;
      });
      spot.avgRating = Math.round(
        ((total / spot.Reviews.length) * 100) / 100
      ).toFixed(2);
      delete spot.Reviews;
      delete spot.SpotImages;
    });
    const spotsListed = { Spots: spotsList };
    res.json(spotsListed);
  }
});

router.get("/:spotId", async (req, res, next) => {
  const id = req.params.spotId;

  const { user } = req;

  const spot = await Spot.findByPk(id, {
    include: ["Reviews", "SpotImages", "User"],
  });

  if (!spot) {
    return res.status(404).json({ message: "Spot not found" });
  }

  spot.toJSON();

  delete spot.dataValues.User.dataValues.username;
  spot.dataValues.Owner = spot.dataValues.User;
  delete spot.dataValues.User;
  let total = 0;
  spot.Reviews.forEach((review) => {
    total += review.stars;
  });
  spot.dataValues.avgStarRating = Math.round(
    ((total / spot.dataValues.Reviews.length) * 100) / 100
  ).toFixed(2);
  spot.dataValues.numReviews = spot.dataValues.Reviews.length;

  spot.dataValues.SpotImages.forEach((image) => {
    delete image.dataValues.spotId;
    delete image.dataValues.createdAt;
    delete image.dataValues.updatedAt;
  });
  delete spot.dataValues.Reviews;

  return res.json(spot);
});

router.post("/", requireAuth, async (req, res) => {
  const { user } = req;

  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const spot = await Spot.create({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    ownerId: user.id,
  });

  return res.json(spot);
});

router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const { url, preview } = req.body;
  const { user } = req;

  if (user) {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot not found" });
    }

    if (user.id === spot.ownerId) {
      const imagey = await spot.createSpotImage({
        url: url,
        preview: preview,
      });

      return res.json({
        id: imagey.id,
        url: imagey.url,
        preview: imagey.preview,
      });
    }

    return res.status(403).json({
      message: "Must own location to add images",
    });
  }
  return res.status(403).json({
    message: "Authentication required",
  });
});

router.put("/:spotId", requireAuth, async (req, res, next) => {
  const { user } = req;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  if (user) {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot not found" });
    }

    if (user.dataValues.id === spot.dataValues.ownerId) {
      spot.address = address;
      spot.city = city;
      spot.state = state;
      spot.country = country;
      spot.lat = lat;
      spot.lng = lng;
      spot.name = name;
      spot.description = description;
      spot.price = price;

      await spot.save();

      return res.json(spot);
    }
  }
  return res.status(403).json({ message: "Must own location to edit" });
});

router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const { user } = req;

  if (user) {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot not found" });
    }

    if (user.dataValues.id === spot.dataValues.ownerId) {
      await spot.destroy();

      return res.json({ message: "Successfully deleted" });
    }
  }
  return res
    .status(403)
    .json({ message: "Review must belong to the current user" });
});

router.get("/:spotId/reviews", async (req, res, next) => {
  const { user } = req;
  const { spotId } = req.params;

  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    return res.status(404).json({ message: "Spot not found" });
  }
  const usersReviews = await Review.findAll({
    where: {
      spotId: spot.id,
    },
    include: [
      {
        model: User,
      },
      {
        model: ReviewImage,
      },
    ],
  });
  usersReviews.forEach((review) => {
    if (review.User) delete review.User.dataValues.username;
    if (review.ReviewImages.length) {
      review.ReviewImages.forEach((image) => {
        delete image.dataValues.reviewId;
        delete image.dataValues.updatedAt;
        delete image.dataValues.createdAt;
      });
    }
  });
  const result = { Reviews: usersReviews };

  return res.json(result);
});

router.post("/:spotId/reviews", requireAuth, async (req, res, next) => {
  const { user } = req;
  const { review, stars } = req.body;

  if (user) {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot not found" });
    }

    const reviews = await Review.findAll({
      where: {
        userId: user.id,
      },
    });

    if (spot.ownerId === user.id) {
      res.status(403);
      return res.json({ message: "Reviews can not be made to spots you own" });
    }
    reviews.forEach((review) => {
      if (review.spotId === spot.id) {
        res.status(403);
        return res.json({ message: "User already has a review for this spot" });
      }
    });

    const newReview = await spot.createReview({
      review: review,
      stars: stars,
      userId: user.id,
    });

    return res.json(newReview);
  }
  return res.json({ message: "Authentication Required" });
});

router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const { user } = req;
  const { spotId } = req.params;
  if (user) {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
      return res.status(404).json({ mesage: "Spot not found" });
    }

    const bookings = await Booking.findAll({
      where: {
        spotId: spotId,
      },
      include: [
        {
          model: User,
        },
      ],
    });

    let bookingsList = [];
    bookings.forEach((booking) => {
      bookingsList.push(booking.toJSON());
    });

    // bookingsList.forEach((booking) => {
    //   if (booking.User) {
    //     delete booking.User.username;
    //     if (booking.userId !== user.id) {
    //       delete booking.User;
    //       delete booking.userId;
    //       delete booking.createdAt;
    //       delete booking.id;
    //       delete booking.updatedAt;
    //     }
    //   }
    // });

    let result = { Bookings: bookingsList };

    return res.json(result);
  }
  return res.json({ message: "Authentication Required" });
});

router.post("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const { user } = req;
  const { startDate, endDate } = req.body;
  if (user) {
    let errors = {};

    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();
    const currentTime = new Date().getTime();

    if (startTime > endTime) {
      errors.endDate = "endDate cannot be on or before startDate";
    }

    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot not found" });
    }

    const bookings = await Booking.findAll({
      where: {
        spotId: spot.id,
      },
    });

    bookings.forEach((booking) => {
      if (
        startTime >= booking.dataValues.startDate.getTime() &&
        startTime <= booking.dataValues.endDate.getTime()
      ) {
        errors.startDate = "Start date conflicts with an existing booking";
      }
      if (
        endTime >= booking.dataValues.startDate.getTime() &&
        endTime <= booking.dataValues.endDate.getTime()
      ) {
        errors.endDate = "End date conflicts with an existing booking";
      }
    });

    if (user.dataValues.id === spot.dataValues.ownerId) {
      return res
        .status(403)
        .json({ message: "Bookings can not be made to spots you own" });
    }

    if (Object.keys(errors).length) {
      res.status(403);
      return res.json({ message: "Bad Request", errors: errors });
    }
    const newBooking = await spot.createBooking({
      startDate: startDate,
      endDate: endDate,
      userId: user.id,
    });
    return res.json(newBooking);
  }
  return res.json({ message: "Authentication Required" });
});

module.exports = router;
