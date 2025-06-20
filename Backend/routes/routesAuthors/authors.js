const express = require("express");
const authors = express.Router();

const authorController = require("../../controller/controllerAuthors/authors");
const {
  userBodyValidator,
  userBodyValidation,
} = require("../../middlewares/validateUserBody");

authors.get("/", authorController.findAll);
authors.get("/:authorId", authorController.findOne);
authors.get("/search/name", authorController.findByName);
authors.post(
  "/create",
  userBodyValidation,
  userBodyValidator,
  authorController.createAuthor
);
authors.patch("/update/:id", authorController.updateAuthor);
authors.delete("/delete/:id", authorController.deleteAuthor);

module.exports = authors;
