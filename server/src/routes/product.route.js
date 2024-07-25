const express = require("express");
const { addProductController, getAllProductsController } = require("../controllers/product.controllers");
const { Verify } = require("../middleware/verify.middlewares.js");

const productRouters = express.Router();

// Add product route -- POST request
productRouters.post(
    "/addProduct",
    Verify,
    addProductController
);

productRouters.get('/all-product', Verify, getAllProductsController);

module.exports = productRouters;