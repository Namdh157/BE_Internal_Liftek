const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const authController = require("./auth.controller.js");

const routerAuth = Router();

routerAuth.post("/register", authController.register);
routerAuth.get("/verify-email/:token", authController.verifyEmail);
routerAuth.post("/login", authController.login);
routerAuth.post("/logout", authMiddleware, authController.logout);
routerAuth.post("/refresh-token", authMiddleware, authController.getNewAccessToken);
routerAuth.post("/forgot-password", authController.forgotPassword);
routerAuth.post("/reset-password", authController.resetPassword);

module.exports = routerAuth;