const express = require("express");
const { AddProduct, GetAllProducts } = require("../controllers/product.js");
const { Verify } = require("../middleware/verify.js");

const router = express.Router();

// Add product route -- POST request
router.post(
    "/addProduct",
    Verify,
    AddProduct
);

router.get(
    '/all-product',
    Verify,
    GetAllProducts
);

module.exports = router;