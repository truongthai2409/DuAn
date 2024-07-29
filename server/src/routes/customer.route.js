const express = require("express");
const { addCustomerController, getAllCustomerController, getCustomerController, putchCustomerController, deleteCustomerController } = require("../controllers/customer.controllers");
const validateCustomer = require("../middleware/customer.middleware");

const customerRouters = express.Router();

customerRouters.post('/addCustomer', validateCustomer, addCustomerController);
customerRouters.get('/', getAllCustomerController);  // getALl
customerRouters.get('/:id', getCustomerController);  // get id
customerRouters.put('/:id', validateCustomer, putchCustomerController);  //  put id
customerRouters.delete('/:id', deleteCustomerController);  // get id

module.exports = customerRouters;