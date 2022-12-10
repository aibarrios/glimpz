class AppError extends Error {
  // Takes message and status code when creating an instance
  constructor(message, statusCode) {
    // Class Error takes message, therefore call super(message)
    super(message);
    this.statusCode = statusCode;
    // Check status code if it starts with 4** set status property to fail
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // Set isOperational property to true
    this.isOperational = true;
    // Set stack property, returns string describing the point in the code at which the Error was created
    // Omit "new AppError" frame from the original error stack, format stack
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
