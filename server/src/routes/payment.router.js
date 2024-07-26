const express = require("express");
const { Verify } = require("../middleware/verify.middlewares.js");
const { zaloPayController, paymentSuccessController } = require("../controllers/zalopay.controllers.js");

const paymentRouters = express.Router();

paymentRouters.post("/zalo-pay", Verify, zaloPayController);
paymentRouters.post("/callback", paymentSuccessController);

module.exports = paymentRouters;