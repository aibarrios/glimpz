const express = require('express');

const {
  aliasTopTours,
  getMonthlyPlan,
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require('./../controllers/toursController');

const { protect, restrictTo } = require('./../controllers/authController');

const router = express.Router();

//.param will search for the specified parameter in the url then perform the special middleware with 4 parameters (req,res,next,val)
// router.param('id', checkID);
//To chain multiple middlewares for the same route, add them with comma separator, just be mindful of the stack sequence.
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/').get(protect, getAllTours).post(createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
