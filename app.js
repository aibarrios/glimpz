//App related configuration here

//We will be using express.js
const express = require('express');

//morgan is a logger middleware
const morgan = require('morgan');

//express-rate-limit to avoid DoS attacks
const rateLimit = require('express-rate-limit');

//helmet for HTTP Headers Security
const helmet = require('helmet');

const mongoSanitize = require('express-mongo-sanitize');

const xss = require('xss-clean');

//Prevents paramter pollution
const hpp = require('hpp');

//Operational Error blueprint
const AppError = require('./utils/appError');
//Global Operational Error Handler
const globalErrorHandler = require('./controllers/errorController');

//Router modules
const toursRouter = require('./routes/toursRouter');
const usersRouter = require('./routes/usersRouter');
const reviewsRouter = require('./routes/reviewsRouter');

const app = express();

//Request-Response Cycle: Incoming request -> Middleware Stack -> Response
//Middleware -> a piece of code that can modify the request or response object, it occurs between the request and response event
//Note: The sequence of middlewares is important (FIFO). request and response object is passed to the next middleware until you send a response, which end the request-response cycle

app.use(helmet());

//We will check first if the Node environment is in development then we will use morgan logger middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: `Too many requests from this IP address, please try again after one (1) hour.`,
});

app.use('/api', limiter);

//express.js body-parser (JSON to JS Object) - with document size limit
app.use(express.json({ limit: '10kb' }));

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS attacks
app.use(xss());

//whiteList: [<propertiesToExempt>]
app.use(
  hpp({
    whiteList: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

//To serve static file(s) from local folder express.static(<path>);
app.use(express.static(`${__dirname}/public`));

//Creating custom middleware
//app.use((req, res, next) => {
//   <codeHere>
//   next();
//});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

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

//Mounting Routers
//app.use(<basePath>, <routerToBeApplied>);
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/reviews', reviewsRouter);

//Handles unhandled routes
app.all('*', (req, res, next) => {
  const err = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );

  next(err);
});

//Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
