const fs = require('fs');
const path = require('path');

//As soon as the server starts we save the object parsed JSON into tours variable.
const tours = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, `../dev-data/data/tours-simple.json`),
    'utf-8'
  )
);

module.exports = tours;
