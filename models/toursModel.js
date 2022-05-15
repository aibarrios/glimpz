//Business Logic (Data)

//MongoDB - Mongoose Setup
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const slugify = require('slugify');

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
    maxlength: [40, 'Name must have less than or equal to 40 characters'],
    minlength: [10, 'Name too short'],
  },
  price: {
    type: Number,
    required: [true, 'Please specify a price for this tour'],
  },
  discount: {
    type: Number,
    //Custom validator
    validate: {
      validator: function (value) {
        //NOTE: can only points to current document on NEW document creation
        return value < this.price;
      },
      message: 'Discount price ({VALUE}) should be below regualar price',
    },
  },
  duration: {
    type: Number,
    required: [true, 'Please specify the duration of this tour.'],
  },
  difficulty: {
    type: String,
    required: [true, 'Please specify the difficulty of this tour.'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: 'Difficulty must be set to easy or medium or difficult only',
    },
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
    min: [1, 'Rating must be more than or equal to 1.0'],
    max: [5, 'Rating must be less than or equal to 5.0'],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  maxGroupSize: Number,
  guides: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  startLocation: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: [Number],
    address: String,
    description: String,
  },
  locations: [
    {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
      day: Number,
    },
  ],
  secretTour: {
    type: Boolean,
    default: false,
  },
  slug: String,
});

//Document Middleware //Note: runs before .save() and .create()
//tourSchema.pre('save', cbFunc(next){next()})
//tourSchema.post('save', cbFunc(document, next){})
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//Embedding / Denormalizing data
// tourSchema.pre('save', async function (next) {
//   const guidesPromises = this.guides.map(async (id) => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
// });

tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

//Aggregation Middleware
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
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
