const HttpException = require("../author/index");

class InvalidOrMissingTokenException extends HttpException {
  constructor(
    message = "Please provide valid token!",
    statusCode = 403,
    error = "Invalid token! "
  ) {
    super(message, statusCode, error);
  }
}

module.exports = InvalidOrMissingTokenException;
