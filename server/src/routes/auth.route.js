const { Router } = require("express");
const validateRegister = require("../middleware/validateRegister.middlewares");
const validateLogin = require("../middleware/validateLogin.middlewares");
const { Validate } = require("../middleware/validate.middlewares");
const { registerController, loginController, logoutController } = require("../controllers/auth.controllers.js");

const authRouters = Router();

authRouters.post("/register", validateRegister, Validate, registerController);
authRouters.post("/login", validateLogin, Validate, loginController);
authRouters.get('/logout', logoutController);

module.exports = authRouters;