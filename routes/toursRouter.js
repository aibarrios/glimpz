const express = require('express');
const reviewsRouter = require('./../routes/reviewsRouter');
const {
  aliasTopTours,
  getToursWithin,
  getDistances,
  getMonthlyPlan,
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require('./../controllers/toursController');
const { protect, restrictTo } = require('./../controllers/authController');

const router = express.Router();

router.use('/:tourId/reviews', reviewsRouter);
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin);

router.route('/distance/:latlng/unit/:unit').get(getDistances);

router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);

router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
