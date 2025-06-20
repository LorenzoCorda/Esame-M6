const { body, validationResult } = require("express-validator");

const adminBodyValidation = [
  body("name")
    .notEmpty()
    .isString()
    .isLength({ min: 2, max: 20 })
    .withMessage("FirstName must be a valid string!"),
  body("surName")
    .notEmpty()
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage("LastName must be a valid string!"),
  body("email")
    .notEmpty()
    .isEmail()
    .isString()
    .withMessage("Email must be a valid string!"),
  body("password")
    .notEmpty()
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password must be a valid string!"),
  body("dob")
    .notEmpty()
    .isInt({ min: 5 })
    .withMessage("Age must be  minimum 5 and a integer number!"),
  body("avatar")
    .notEmpty()
    .withMessage("Age must be  minimum 5 and a integer number!"),
];

const adminBodyValidator = (request, response, next) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({
      errors: errors.array(),
    });
  }
};

module.exports = {
  adminBodyValidation,
  adminBodyValidator,
};
