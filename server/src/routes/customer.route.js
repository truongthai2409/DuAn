const express = require("express");
const { insertCustomer } = require("../services/user.service");

const customerRouters = express.Router();

customerRouters.post('/customer', insertCustomer)

module.exports = customerRouters;