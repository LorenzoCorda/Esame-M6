const authService = require("../../services/servicesAuth/auth");

const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const { token } = await authService.login(email, password);

    response.header("authorization", token).status(200).send({
      statusCode: 200,
      message: "Login successfully ",
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
