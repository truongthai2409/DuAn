const express = require("express");
const { addProductController, getAllProductsController, getAllProductsFromLazada, SynchronizeLazadaProducts, GetCategoryTreeLazada } = require("../controllers/product.controllers");
const { Verify } = require("../middleware/verify.middlewares.js");

const productRouters = express.Router();

// Add product route -- POST request
productRouters.post(
    "/addProduct",
    Verify,
    addProductController
);

productRouters.get('/all-product', Verify, getAllProductsController);

productRouters.get('/all-product-from-lazada', getAllProductsFromLazada);

productRouters.get('/sync-product-lazada', SynchronizeLazadaProducts);

productRouters.get('/category-tree', GetCategoryTreeLazada);


module.exports = productRouters;