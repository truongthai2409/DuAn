const express = require("express");
const { Verify, VerifyRole } = require("../middlewares/verify.middlewares");
const { adminController } = require("../controllers/admin.controllers");

const adminRouters = express.Router();

adminRouters.get("/admin", Verify, VerifyRole, adminController);

module.exports = adminRouters;