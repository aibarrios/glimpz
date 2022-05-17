const Review = require('./../models/reviewsModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./../utils/handlerFactory');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  const { review, rating, tour, user } = req.body;

  const newReview = await Review.create({
    review,
    rating,
    tour,
    user,
  });

  res.status(201).json({
    status: 'success',
    data: {
      newReview,
    },
  });
});

exports.deleteReview = factory.deleteOne(Review);
