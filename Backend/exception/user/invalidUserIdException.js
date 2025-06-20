const HttpException = require("../index");

class InvalidUserIdException extends HttpException {
  constructor(
    message = "User id not found!",
    statusCode = 404,
    error = "The requested user id does not exist! "
  ) {
    super(message, statusCode, error);
  }
}

module.exports = InvalidUserIdException;
