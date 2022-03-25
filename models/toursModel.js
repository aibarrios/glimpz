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
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Connected to the database...`))
  .catch((error) => console.error(error.message));

//Schema (Reference for type|value|validation) -> Model (Blueprint / like Class in JS)
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required to create new tour'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'Please specify a price for this tour'],
  },
  rating: {
    type: Number,
    default: 4.5,
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
