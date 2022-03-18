const express = require('express');
const morgan = require('morgan');
const toursRouter = require('./routes/toursRouter');
const usersRouter = require('./routes/usersRouter');
//copy methods / functions to our app
const app = express();

//Request-Response Cycle: Incoming request -> Middleware Stack -> Response
//Middleware -> a piece of code that can modify the request or response object, it occurs between the request and response event
//Note the sequence of middlewares is important (FIFO). request and response object is passed to the next middleware until you send a response, which end the request-response cycle
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json()); //Express body-parser (JSON to JS Object)
app.use(express.static(`${__dirname}/public`)); //To serve a file from local folder express.static(<path>);

//Creating custom middleware
//app.use((req, res, next) => {
//   <codeHere>
//   next();
//});

//CRUD operations - http methods; Stateless RESTful API -> all state is handled on the client.
//Create - POST used to add new data to our database, data sent is on request parameter
//Read - GET used to inquire data from our database
//Update - PUT (updates all properties) || PATCH (updates some properties) used to update exisiting data from our database.
//Delete - DELETE data from our database

//Route - app.<http-method>('<url>', callback function)
// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side', appName: 'hotspot' });
// });

//Response status code [Common]
//Successful responses
//200 OK - request succedded
//201 Created - after POST or PUT request(s)
//204 No content - after DELETE method
//Client error responses
//400 Bad request - server cannot or will not process request
//401 Unauthorized
//403 Forbidden - client is authorized but doesn't have rights to access the content
//404 Not Found - cannot find requested resource
//Server error responses
//500 Internal server error

//Mouting Routers
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
