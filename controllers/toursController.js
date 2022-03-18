const fs = require('fs');
const { dirname } = require('path');
const tours = require('./../localDataRead');

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

exports.checkID = (req, res, next, val) => {
  // req.params is where all variables (example: id) in the url are stored
  //Check if the ID number is within the range of available number of tours
  //-1 because it array starts with 0
  //We've multiplied it by 1 to coerce the id string type to number type
  if (req.params.id * 1 > tours.length - 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

//jsend format res.status(<statusCode>).send({status: 'success/fail', data: {<dataHere>}})
exports.getAllTours = (req, res) => {
  res.status(200).send({
    status: 'success',
    results: tours.length, //not necessary if array length is only one
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;

  //Filter tours by the parameter id
  const tour = tours.find((tour) => {
    return tour.id === id;
  });

  res.status(200).send({
    status: 'success',
    data: {
      tour,
    },
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
  //to delete
  //create copy of tours array
  //filter array, returns all elements which ID is not the ID to be deleted
  //write to File returned from filtered array
  const id = req.params.id * 1;
  const newTour = [...tours].filter((tour) => {
    return tour.id !== id;
  });
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(newTour),
    'utf-8',
    (error) => {
      if (error) return error;
      //204
      return res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};

exports.createTour = (req, res) => {
  const data = req.body;
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, data); //returns new Object with additional key-value pairs.
  //We add the new data from newTour object to our existing tours array.
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours), //since our file is in JSON format we will transform our data into JSON format using stringify method
    'utf-8',
    (error) => {
      //this is a guard clause, as soon as we receive an error we wil return the error and close the function call.
      if (error) return error;
      //201
      res.status(201).send({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
