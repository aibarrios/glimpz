const AppError = require('./../utils/appError');

//Error Handlers
const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateNameDB = (err) => {
  const values = Object.values(err.keyValue).join(', ');
  const message = `Duplicate field value(s): ${values}. Please try different value(s)!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const keys = Object.keys(err.errors).join(', ');
  const errors = Object.values(err.errors).map((val) => val.message);
  const message = `Validation error(s) on: ${keys}. ${errors.join('. ')}.`;
  return new AppError(message, 404);
};

//Development Mode
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

//Production Mode
const sendErrorProd = (err, res) => {
  //Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR', err);

    res.status(500).json({
      status: 'error',
      message: 'Server error, something went wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    //Operational Errors
    if (err.name === 'CastError') error = handleCastError(error);
    if (err.code === 11000) error = handleDuplicateNameDB(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};
