const { check,  validationResult } = require("express-validator");

const Validate = (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = {};
        errors.array().map((err) => (error[err.param] = err.msg));
        return res.status(422).json({ error });
    }
    console.log("hello11")
    next();
};


module.exports = { Validate };