//Server related configuration here @server.js

//dotenv for Node environment configuration
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

//app.js contains our main app related configuration
const app = require('./app');

//check for the environment port if available, if not set the port number to 3000
const port = process.env.PORT || 3000;

//start our server by listening to it
app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
