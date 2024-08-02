const express = require("express");
const { Verify } = require("../middleware/verify.middlewares");
const { userControllers } = require("../controllers/user.controllers");
const { sendEmailController } = require("../controllers/email.controllers");

const userRouters = express.Router();

userRouters.get("/user", Verify, userControllers);
userRouters.post("/send-email", Verify, sendEmailController);

module.exports = userRouters;