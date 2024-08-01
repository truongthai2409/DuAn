function validateCustomer(req, res, next) {
    try {
        const { name, code, phone, address, email } = req.body;
        console.log( { name, code, phone, address, email } )
        if (!name || !code || !phone || !address || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: "Phone number must be 10 digits" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
    } catch (error) {
        console.log(error)
    }
    next();
}

module.exports = validateCustomer;
