const express = require("express");
const auth = express.Router();
const authController = require("../../controller/controllerAuth/auth");

auth.post("/login", authController.login);

module.exports = auth;
