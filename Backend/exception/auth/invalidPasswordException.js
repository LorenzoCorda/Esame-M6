const HttpException = require("../author/index");

class InvalidAuthorIdException extends HttpException {
  constructor(
    message = "Invalid email or password provided!",
    statusCode = 403,
    error = "Please provide valid credential to access this resource! "
  ) {
    super(message, statusCode, error);
  }
}

module.exports = InvalidAuthorIdException;
