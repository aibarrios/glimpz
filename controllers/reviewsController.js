const Review = require('./../models/reviewsModel');
const factory = require('./../utils/handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.setTourAndUserId = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.checkReviewerId = catchAsync(async (req, res, next) => {
  const { id, role } = req.user;
  const review = await Review.findById(req.params.id);
  const reviewerId = review.user._id.toString();

  if (!(id === reviewerId || role === 'admin')) {
    return next(
      new AppError(`You can't edit/delete a review that you didn't make.`, 403)
    );
  }

  next();
});

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
