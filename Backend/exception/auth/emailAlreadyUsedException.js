class EmailAlreadyUsedException extends Error {
  constructor() {
    super("Email already used");
    this.name = "EmailAlreadyUsedException";
    this.statusCode = 400;
  }
}

module.exports = EmailAlreadyUsedException;
