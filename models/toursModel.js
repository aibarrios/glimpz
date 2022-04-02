//Business Logic (Data)

//MongoDB - Mongoose Setup
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

//We will be using mongoose.js an Object Data Mapper (ODM) for MongoDB-Node.js
const mongoose = require('mongoose');
//mongoose.connect('<database_uri>', {options});
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to the database...`))
  .catch((error) => console.error(error.message));

//Schema (Reference for type|value|validation) -> Model (Blueprint / like Class in JS)
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required to create new tour'],
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Please specify a price for this tour'],
  },
  discount: Number,
  duration: {
    type: Number,
    required: [true, 'Please specify the duration of this tour.'],
  },
  difficulty: {
    type: String,
    required: [true, 'Please specify the difficulty of this tour.'],
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'Please give a brief summary for this tour.'],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Please describe this tour.'],
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image.'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false, // To hide it from the output query
  },
  startDates: [Date],
  rating: {
    type: Number,
    default: 4.5,
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
});

//Creating new model = collection
const Tour = new mongoose.model('Tour', tourSchema);
//Sample document creation
// const tour = new Tour({
//   name: 'The Forest Hiker',
//   price: 497,
// });
// tour.save();

module.exports = Tour;
