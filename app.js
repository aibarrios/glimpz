const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const toursRouter = require('./routes/toursRouter');
const usersRouter = require('./routes/usersRouter');
const reviewsRouter = require('./routes/reviewsRouter');
const viewsRouter = require('./routes/viewsRouter');

const app = express();

// Set Pug.js as template engine
app.set('view engine', 'pug');
// Set templates path
app.set('views', path.join(__dirname, 'views'));
// Set path to static files
app.use(express.static(path.join(__dirname, 'public')));

// Use helmet.js middleware, secure Express apps by setting various HTTP headers
app.use(helmet());

// Check environment, if Development use morgan middleware, for logging req-res
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// express-rate-limit configuration
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: `Too many requests from this IP address, please try again after one (1) hour.`,
});

// Use express-rate-limit middleware, limtis repeated requests to public API and/or endpoints
app.use('/api', limiter);

// Express middleware that parses incoming requests with JSON payloads, with controls the maximum request body size option
// No need body-parser package
app.use(express.json({ limit: '10kb' }));

// Use express-mongo-sanitize middleware, sanitizes user-supplied data to prevent MongoDB Operator injection
app.use(mongoSanitize());

// Use xss-clean middleware, sanitizes user input or any data in req.body, req.params, and req.query
app.use(xss());

// Use hpp (HTTP Parameter Pollution) middleware, and whitelist some of the query parameters
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

// Middleware that modifies request object to set timestamp of the request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Main application APIs!!!
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/reviews', reviewsRouter);
// Default endpoint
app.use('/', viewsRouter);

// Endpoint not found -> create Error object -> pass the Error object to globalErrorHandler / errorController via next function
app.all('*', (req, res, next) => {
  const err = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );

  next(err);
});

// Use errorController middleware, handles identified potential Operational Errors
app.use(globalErrorHandler);

// Default export app, to be imported in server.js
module.exports = app;
