const express = require("express");
const userController = require("./user.controller.js");

const upload = require("../config/multer.js");
const routeUser = express.Router();

routeUser.route("/").get(userController.getAllUsers);
routeUser.route("/:id").get(userController.getUserById);
routeUser.param("id", userController.load);

routeUser.put(
  "/update-profile",
  upload.single("avatar"),
  userController.updateUser
);

module.exports = routeUser;
