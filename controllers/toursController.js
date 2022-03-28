//App logic for tours router

const Tour = require('../models/toursModel');

//middleware to check body from POST request, must have both name and price
// exports.checkBody = (req, res, next) => {
//   const body = req.body;
//   if (!(body.name && body.price)) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Bad request, missing some properties.',
//     });
//   }
//   next();
// };

//Param middleware (req,res,next,val) => {next()}, check if the url have specific param
// exports.checkID = (req, res, next, val) => {
// req.params is where all variables (example: id) in the url are stored
//Check if the ID number is within the range of available number of tours
//-1 because it array starts with 0
//We've multiplied it by 1 to coerce the id string type to number type
//   if (req.params.id * 1 > tours.length - 1) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

//jsend format res.status(<statusCode>).json({status: 'success/fail', data: {<dataHere>}})
exports.getAllTours = async (req, res) => {
  try {
    //Check if we have a specific query /api/v1/tours?<key>=<value>...
    //req.query will return an object containg key=value pair
    //First we need to make a copy of the object using the Object.assign or the spread operator (ES6)
    const queryObj = { ...req.query };
    //Then, we check the properties / keys of the queryObj and delete the said property / key from it.
    const excludedQuery = ['sort', 'limit', 'page', 'fields'];
    excludedQuery.forEach((el) => delete queryObj[el]); //delete Obj['<propertyName>'
    const query = Tour.find(queryObj); //we save it first to query variable, we might do something further
    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
