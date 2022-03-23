const express = require('express');
const toursController = require('./../controllers/toursController');
const { checkBody, getAllTours, createTour, getTour, updateTour, deleteTour } =
  toursController;

const router = express.Router();

//.param will search for the specified parameter in the url then perform the special middleware with 4 parameters (req,res,next,val)
// router.param('id', checkID);
//To chain multiple middlewares for the same route, add them with comma separator, just be mindful of the stack sequence.
router.route('/').get(getAllTours).post(checkBody, createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
