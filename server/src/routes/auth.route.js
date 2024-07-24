const { Router } = require("express");
const { registerController, loginController, logoutController } = require("../controllers/auth.controllers.js");
const { Validate } = require("../middlewares/validate.middlewares")
const validateRegister = require("../middlewares/validateRegister.middlewares.js");
const validateLogin = require("../middlewares/validateLogin.middleware.js");

const authRouters = Router();

authRouters.post("/register", validateRegister, Validate, registerController);
authRouters.post("/login", validateLogin, Validate, loginController);
authRouters.get('/logout', logoutController);

module.exports = authRouters;