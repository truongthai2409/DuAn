const express = require("express");
const { AddProduct, GetAllProducts } = require("../controllers/product.js");
// const Validate = require("../middleware/validate.js");
// const { check } = require("express-validator");

const router = express.Router();

// Add product route -- POST request
router.post(
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
    AddProduct
);

// router.post(
//     "/login",
//     check("email")
//         .isEmail()
//         .withMessage("Enter a valid email address")
//         .normalizeEmail(),
//     check("password").not().isEmpty(),
//     Validate,
//     Login
// );

router.get('/all-product', GetAllProducts);

module.exports = router;