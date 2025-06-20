const HttpException = require("./index");

class AuthorNotFoundException extends HttpException {
  constructor(
    message = "Author not found!",
    statusCode = 404,
    error = "The request author is not found "
  ) {
    super(message, statusCode, error);
  }
}

module.exports = AuthorNotFoundException;
