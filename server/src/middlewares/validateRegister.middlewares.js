const { check, validationResult } = require('express-validator');

const validateRegister = [
    check('email')
        .isEmail()
        .withMessage('Enter a valid email address')
        .normalizeEmail(),
    check('first_name')
        .not()
        .isEmpty()
        .withMessage('Your first name is required')
        .trim()
        .escape(),
    check('last_name')
        .not()
        .isEmpty()
        .withMessage('Your last name is required')
        .trim()
        .escape(),
    check('password')
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage('Must be at least 8 chars long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateRegister;
