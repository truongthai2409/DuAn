const express = require("express");
const { addCustomerController, getAllCustomerController, getCustomerController, patchCustomerController, deleteCustomerController } = require("../controllers/customer.controllers");
const validateCustomer = require("../middleware/customer.middleware");
const { Verify } = require("../middleware/verify.middlewares");

const customerRouters = express.Router();

customerRouters.post('/addCustomer', validateCustomer, addCustomerController);
customerRouters.get('/', Verify, getAllCustomerController);  // getALl
customerRouters.get('/:id', Verify, getCustomerController);  // get id
customerRouters.patch('/:id' , Verify, patchCustomerController);  //  put id
customerRouters.delete('/:id', Verify, deleteCustomerController);  // get id

module.exports = customerRouters;