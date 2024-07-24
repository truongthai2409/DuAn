const express = require("express");
const { addProductController, getAllProductsController } = require("../controllers/product.controllers");

const productRouters = express.Router();

// Add product route -- POST request
productRouters.post(
    "/addProduct",
    // check("email")
    //     .isEmail()
    //     .withMessage("Enter a valid email address")
    //     .normalizeEmail(),
    // check("first_name")
    //     .not()
    //     .isEmpty()
    //     .withMessage("You first name is required")
    //     .trim()
    //     .escape(),
    // check("last_name")
    //     .not()
    //     .isEmpty()
    //     .withMessage("You last name is required")
    //     .trim()
    //     .escape(),
    // check("password")
    //     .notEmpty()
    //     .isLength({ min: 8 })
    //     .withMessage("Must be at least 8 chars long"),
    // Validate,
    addProductController
);

// productRouters.post(
//     "/login",
//     check("email")
//         .isEmail()
//         .withMessage("Enter a valid email address")
//         .normalizeEmail(),
//     check("password").not().isEmpty(),
//     Validate,
//     Login
// );

productRouters.get('/all-product', getAllProductsController);

module.exports = productRouters;