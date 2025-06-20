require("dotenv").config();
const AuthorSchema = require("../../models/author");
const AuthorNotFoundException = require("../../exception/author/authorNotFoundException");
const InvalidPasswordException = require("../../exception/auth/invalidPasswordException");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (email, password) => {
  const author = await AuthorSchema.findOne({ email });

  if (!author) {
    console.log("Email not found:", email);
    throw new AuthorNotFoundException();
  }

  const isPasswordValid = await bcrypt.compare(password, author.password);

  if (!isPasswordValid) {
    console.log("Password mismatch for email:", email);
    throw new InvalidPasswordException();
  }
  const token = jwt.sign(
    {
      name: author.firstName,
      surName: author.lastName,
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
