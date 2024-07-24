const express = require("express");
const { Register, Login, Logout, ProfileUser, UpdateProfile } = require("../controllers/auth.js");
const Validate = require("../middleware/validate.js");
const { check } = require("express-validator");
const { Verify } = require("../middleware/verify.js");
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Thư mục để lưu trữ tệp tải lên
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Đặt tên tệp tải lên
    }
});

const upload = multer({ storage: storage });

// Register route -- POST request
router.post(
    "/register",
    check("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),
    check("first_name")
        .not()
        .isEmpty()
        .withMessage("You first name is required")
        .trim()
        .escape(),
    check("last_name")
        .not()
        .isEmpty()
        .withMessage("You last name is required")
        .trim()
        .escape(),
    check("password")
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("Must be at least 8 chars long"),
    Validate,
    Register
);

router.post(
    "/login",
    check("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),
    check("password").not().isEmpty(),
    Validate,
    Login
);

router.get('/logout', Logout);

router.get('/profile', Verify, ProfileUser)

router.put(
    "/update-profile",
    Verify,
    upload.single('avatar'),
    UpdateProfile
)

module.exports = router;