const Customer = require("../models/Customer");

exports.addCustomerController = async (req, res) => {
    try {
        const { name, code, phone, address } = req.body;
        const newCustomer = new Customer({ name, code, phone, address });;
        await newCustomer.save();
        res.status(201).json({
            status: 'success',
            data: newCustomer,
            message: "Customer has been successfully created.",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            message: "Internal Server Error",
        });
    }
    res.end();
}

exports.getAllCustomerController = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getCustomerController = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).send('Customer not found');
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.putchCustomerController = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).send('Customer not found');

        const { name, code, phone, address } = req.body;
        customer.name = name || customer.name;
        customer.code = code || customer.code;
        customer.phone = phone || customer.phone;
        customer.address = address || customer.address;

        await customer.save();
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.deleteCustomerController = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).send('Customer not found');
        await customer.remove();
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}