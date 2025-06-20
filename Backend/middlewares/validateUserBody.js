const { body, validationResult } = require("express-validator");

const userBodyValidation = [
  body("name")
    .notEmpty()
    .withMessage("The field is obligatory!")
    .isString()
    .withMessage("Name must be a valid string!")
    .isLength({ min: 2 })
    .withMessage("The Name must contain at least 2 characters!"),
  body("surName")
    .notEmpty()
    .withMessage("The field is obligatory!")
    .isString()
    .withMessage("SurName must be a valid string!")
    .isLength({ min: 2 })
    .withMessage("The SurName must contain at least 2 characters!"),
  body("email")
    .notEmpty()
    .withMessage("The field is obligatory!")
    .isEmail()
    .withMessage("The e-mail address is invalid!")
    .isString()
    .withMessage("Email must be a valid string!"),
  body("password")
    .notEmpty()
    .withMessage("The field is obligatory!")
    .isString()
    .withMessage("Password must be a valid string!")
    .isLength({ min: 8 })
    .withMessage("The password must contain at least 8 characters!"),
  body("dob")
    .notEmpty()
    .withMessage("The field is obligatory!")
    .isDate()
    .withMessage("The date of birth must be a valid date!"),
];

const userBodyValidator = (request, response, next) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};

module.exports = {
  userBodyValidation,
  userBodyValidator,
};
