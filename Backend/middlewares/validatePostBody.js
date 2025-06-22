const { body, validationResult } = require("express-validator");

const postBodyValidation = [
  body("category")
    .notEmpty()
    .withMessage("The field is obligatory!")
    .isString()
    .withMessage("The category must be a valid string!"),
  body("title")
    .notEmpty()
    .withMessage("The field is obligatory!")
    .isString()
    .withMessage("Title must be a valid string!")
    .isLength({ min: 3 })
    .withMessage("The title must contain at least 3 characters!"),
  body("cover")
    .notEmpty()
    .withMessage("The field is obligatory!")
    .isString()
    .withMessage("Cover must be a string!"),
  body("readTime")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Read time must be at least 1 minute!"),
  /*  body("author")
    .notEmpty()
    .withMessage("The field is obligatory!")
    .isString()
    .withMessage("Author must be a string!"), */
  body("content")
    .notEmpty()
    .withMessage("The field is obligatory!")
    .isString()
    .withMessage("Content must be a string!")
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters!"),
];

const postBodyValidator = (request, response, next) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};

module.exports = {
  postBodyValidation,
  postBodyValidator,
};
