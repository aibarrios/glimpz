//App logic for tours router

//middleware to check body from POST request, must have both name and price
exports.checkBody = (req, res, next) => {
  const body = req.body;
  if (!(body.name && body.price)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Bad request, missing some properties.',
    });
  }
  next();
};

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
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    // data: {
    //   tour,
    // },
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Successfully updated...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
};
