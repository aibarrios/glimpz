const fs = require('fs');

//As soon as the server starts we save the object parsed JSON into tours variable.
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

module.exports = tours;
