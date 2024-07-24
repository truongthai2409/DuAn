const { Router } = require("express");
const { registerController, loginController, logoutController } = require("../controllers/auth.controllers.js");
const { Validate } = require("../middlewares/validate.middlewares")
const validateRegister = require("../middlewares/validateRegister.middlewares.js");
const validateLogin = require("../middlewares/validateLogin.middleware.js");
const { check } = require("express-validator");

const authRouters = Router();

// authRouters.post( "/register", validateRegister, Validate, registerController);

authRouters.post(
    "/login",
    check("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),
    check("password").not().isEmpty(),
    Validate,
    loginController
);

// authRouters.get('/logout', logoutController);

module.exports = authRouters;