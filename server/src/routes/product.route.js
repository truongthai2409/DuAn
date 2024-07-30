const express = require("express");
const { addProductController, getAllProductsController, getAllProductsFromLazada, SynchronizeLazadaProducts, GetCategoryTreeLazada, updateProductController, getAProductsByIdController, deleteProductController, addProductExtensionController } = require("../controllers/product.controllers");
const { Verify, verifiToken } = require("../middleware/verify.middlewares.js");
const { upload } = require("../services/upload.service.js");

const productRouters = express.Router();

// Add product route -- POST request
productRouters.post(
    "/addProduct",
    Verify,
    upload.single('image'),
    addProductController
);

productRouters.post("/add-product-extension", verifiToken, addProductExtensionController);

productRouters.get('/all-product', Verify, getAllProductsController);

productRouters.get('/all-product-from-lazada', getAllProductsFromLazada);

productRouters.get('/sync-product-lazada', Verify, SynchronizeLazadaProducts);

productRouters.get('/category-tree', GetCategoryTreeLazada);

productRouters.put('/update-product', Verify, upload.single('image'), updateProductController);

productRouters.get('/get-a-product/:id', Verify, getAProductsByIdController);

productRouters.delete('/delete-product', Verify, deleteProductController);


module.exports = productRouters;