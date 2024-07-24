const { insertUser } = require("../services/user.service");
const express = require("express");

const userRouter = express.Router();

userRouter.post('/users', insertUser)

module.exports = userRouter;