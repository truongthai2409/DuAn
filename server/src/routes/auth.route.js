const { Router } = require("express");
const validateRegister = require("../middleware/validateRegister.middlewares");
const validateLogin = require("../middleware/validateLogin.middlewares");
const { Validate } = require("../middleware/validate.middlewares");
const { registerController, loginController, logoutController, updateProfileController, profileUserController, updateShopController, loginExtensionController } = require("../controllers/auth.controllers.js");
const { Verify } = require("../middleware/verify.middlewares.js");
const { upload } = require("../services/upload.service.js");

const authRouters = Router();

authRouters.post("/register", validateRegister, Validate, registerController);
authRouters.post("/login", validateLogin, Validate, loginController);
authRouters.post("/login-extesion", validateLogin, Validate, loginExtensionController);
authRouters.get('/logout', logoutController);
authRouters.get('/profile', Verify, profileUserController)
authRouters.put('/update-profile', Verify, upload.single('avatar'), updateProfileController);

module.exports = authRouters;