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

router.use(protect);

router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setTourAndUserId, createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('admin', 'user'), checkReviewerId, updateReview)
  .delete(restrictTo('admin', 'user'), checkReviewerId, deleteReview);

module.exports = router;
