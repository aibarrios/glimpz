const express = require('express');

const {
  getAllReviews,
  createReview,
} = require('./../controllers/reviewsController');

const router = express.Router();

router.route('/').get(getAllReviews).post(createReview);

module.exports = router;
