const mongoose = require("mongoose");
const HttpException = require("../exception/author/index");

const errorHandler = (error, request, response, next) => {
  if (error instanceof HttpException) {
    return response.status(error.statusCode || 500).json({
      status: error.statusCode,
      message: error.message,
      error: error.error,
    });
  }

  if (error instanceof mongoose.Error.CastError) {
    return response.status(400).json({
      statusCode: 400,
      message: "Mongoose Error: object id invalid or malformed",
      error: error.error,
    });
  }
  response.status(500).json({
    status: "error",
    message: "Internal server error",
    error:
      "An error has occurred, please try again later or contact the developer",
  });
};

module.exports = errorHandler;
