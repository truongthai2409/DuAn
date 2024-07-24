const express = require("express");
const { Verify } = require("../middlewares/verify.middlewares");
const { userControllers } = require("../controllers/user.controllers");

const userRouters = express.Router();

userRouters.get("/user", Verify, userControllers);

module.exports = userRouters;