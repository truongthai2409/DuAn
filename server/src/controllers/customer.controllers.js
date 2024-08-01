const Customer = require("../models/Customer");
const mongoose = require('mongoose');

exports.addCustomerController = async (req, res) => {
    try {
        const { name, code, phone, address, email } = req.body;

        const newCustomer = new Customer({ name, code, phone, address, email });;
        await newCustomer.save();
        console.log(req.body)
        res.status(201).json({
            status: 'success',
            data: { name, code, phone, address, email },
            message: "Customer has been successfully created.",
        });
    } catch (err) {
        console.log(err)
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
exports.patchCustomerController = async (req, res) => {
    try {
        // Validate the ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send('Invalid customer ID');
        }

        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).send('Customer not found');

        const { name, phone, address } = req.body;
        customer.name = name || customer.name;
        customer.phone = phone || customer.phone;
        customer.address = address || customer.address;

        await customer.save();
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteCustomerController = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        console.log(req.params.id)
        if (!customer) return res.status(404).send('Customer not found');
        await Customer.deleteOne({ _id: req.params.id });
        res.json({
            message: "Delete Success!"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
