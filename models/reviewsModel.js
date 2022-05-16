const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to the database...`))
  .catch((error) => console.error(error.message));

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Please tell something about this tour.'],
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be more than or equal to 1.0'],
    max: [5, 'Rating must be less than or equal to 5.0'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  tour: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.'],
    },
  ],
  user: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user.'],
    },
  ],
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'tour',
  }).populate({
    path: 'user',
    select: '-__v -passwordChangedAt',
  });
  next();
});

const Review = new mongoose.model('Review', reviewSchema);

module.exports = Review;
