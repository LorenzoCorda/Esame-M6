const express = require("express");
const users = express.Router();

const userController = require("../../controller/controllerUsers/users");
/* const validateUser = require("../../middlewares/validateUserBody"); */
const {
  userBodyValidator,
  userBodyValidation,
} = require("../../middlewares/validateUserBody");

users.get("/", userController.findAll);
users.get("/:userId", userController.findOne);
users.get("/search/name", userController.findByName);
users.post(
  "/create",
  [/* validateUser, */ userBodyValidation, userBodyValidator],
  userController.createUser
);
users.patch("/update/:id", userController.updateUser);
users.delete("/delete/:id", userController.deleteUser);

module.exports = users;
