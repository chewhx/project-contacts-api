const ErrorClass = require("../utils/errorClass");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  console.log(err);

  // Mongoose cast error
  if (err.name === "CastError") {
    const message = `Invalid id ${err.value}`;
    error = new ErrorClass(400, message);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorClass(400, message);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || err.message || `Server Error`,
  });
};

module.exports = errorHandler;
