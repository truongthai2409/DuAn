const { Router } = require("express");
// const { check } = require("express-validator");
const { registerController, loginController, logoutController } = require("../controllers/auth.controllers.js");
// const { Validate, validateRegister } = require("../middlewares/validate.middleware.js");
const { Validate } = require("../middlewares/validate.middlewares")
const validateRegister = require("../middlewares/validateRegister.middlewares.js");
const { check } = require("express-validator");

const authRouters = Router();

// Register route -- POST request
// authRouters.post( "/register", validateRegister, Validate, registerController);

authRouters.post( "/login",
    check("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),
    check("password").not().isEmpty(),
    Validate,
    loginController
);

authRouters.get('/logout', logoutController);

module.exports = authRouters;