/* const publicRoutes = require("../config/publicRoutes");
const jwt = require("jsonwebtoken");
const InvalidOrMissingTokenException = require("../exception/auth/invalidOrMissingTokenException");

const verifiedToken = async (request, response, next) => {
  if (publicRoutes.includes(request.path)) return next();

  const token = request.header("Authorization");

  if (!token) {
    throw new InvalidOrMissingTokenException();
  }

  try {
    request.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    next(error);
  }
}; 

module.exports = verifiedToken;*/

const jwt = require("jsonwebtoken");
const publicRoutes = require("../config/publicRoutes");
const InvalidOrMissingTokenException = require("../exception/auth/invalidOrMissingTokenException");

const verifiedToken = async (request, response, next) => {
  if (publicRoutes.includes(request.path)) return next();

  const authHeader = request.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new InvalidOrMissingTokenException();
  }

  const token = authHeader.split(" ")[1];

  try {
    request.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifiedToken;
