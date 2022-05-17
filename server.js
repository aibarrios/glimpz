//Server related configuration here @server.js

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT REJECTION! Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

//dotenv for Node environment configuration
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

//app.js contains our main app related configuration
const app = require('./app');

//check for the environment port if available, if not set the port number to 3000
const port = process.env.PORT || 3000;

//start our server by listening to it
const server = app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const mongoose = require('mongoose');

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to the database...`))
  .catch((error) => console.error(error.message));

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
