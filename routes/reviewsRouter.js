const express = require('express');

const {
  getAllReviews,
  createReview,
  deleteReview,
} = require('./../controllers/reviewsController');

const { protect, restrictTo } = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(protect, getAllReviews)
  .post(protect, restrictTo('user'), createReview)
  .delete(protect, restrictTo('user'), deleteReview);

module.exports = router;
