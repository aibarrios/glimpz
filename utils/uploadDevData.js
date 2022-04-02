const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const path = require('path');
const fs = require('fs');
const Tour = require('./../models/toursModel');
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

const tours = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../dev-data/data/tours.json'), 'utf-8')
);

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log(`Data uploaded successfully.`);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log(`All data deleted successfully.`);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
};

if (process.argv[2] === '--import') importData();
if (process.argv[2] === '--delete') deleteData();
