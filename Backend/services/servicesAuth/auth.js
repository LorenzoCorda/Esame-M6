require("dotenv").config();
const AuthorSchema = require("../../models/author");
const AuthorNotFoundException = require("../../exception/author/authorNotFoundException");
const InvalidPasswordException = require("../../exception/auth/invalidPasswordException");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (email, password) => {
  const author = await AuthorSchema.findOne({ email });

  if (!author) {
    throw new AuthorNotFoundException();
  }

  const isPasswordValid = await bcrypt.compare(password, author.password);

  if (!isPasswordValid) {
    throw new InvalidPasswordException();
  }
  const token = jwt.sign(
    {
      name: author.name,
      surName: author.surName,
      email: author.email,
    },

    process.env.JWT_SECRET,
    {
      expiresIn: "5m",
    }
  );

  return {
    token,
  };
};

module.exports = {
  login,
};
