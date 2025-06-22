const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const authGithub = async (request, response, next) => {
  try {
    const redirectUrl = `http://localhost:5173/success?user=${encodeURIComponent(
      JSON.stringify(request.user)
    )}`;
    response.redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
};

const manageOauthCallback = async (req, res, next) => {
  try {
    const { user } = req;

    const token = jwt.sign(
      {
        name: user.displayName || user.username || "GitHub User",
        email: user.emails?.[0]?.value,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    const redirectUrl = `http://localhost:5173/success?token=${encodeURIComponent(
      token
    )}`;
    res.redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authGithub,
  manageOauthCallback,
};
