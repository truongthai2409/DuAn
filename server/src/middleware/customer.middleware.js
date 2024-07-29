function validateCustomer(req, res, next) {
    const { name, code, phone, address } = req.body;

    if (!name || !code || !phone || !address) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: "Phone number must be 10 digits" });
    }

    next();
}

module.exports = validateCustomer;
