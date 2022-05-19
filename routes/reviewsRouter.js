const express = require('express');

const {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  setTourAndUserId,
  checkReviewerId,
} = require('./../controllers/reviewsController');

const { protect, restrictTo } = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), setTourAndUserId, createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(protect, restrictTo('admin', 'user'), checkReviewerId, updateReview)
  .delete(protect, restrictTo('admin', 'user'), checkReviewerId, deleteReview);

module.exports = router;
