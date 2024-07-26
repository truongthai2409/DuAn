const Product = require("../models/Product.js");
const LazadaApi = require("../config/lazada.config.js")

exports.addProductController = async (req, res) => {

    const { image, name, price, productDescription, inventory } = req.body;
    try {
        // create an instance of a user
        const newProduct = new Product({
            image,
            name,
            price,
            productDescription,
            inventory
        });
        const savedProduct = await newProduct.save(); // save new product into the database
        // const { role, ...user_data } = savedUser._doc;
        res.status(200).json({
            status: "success",
            data: [savedProduct],
            message:
                "Product has been successfully created.",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
    res.end();
}

exports.getAllProductsController = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getAllProductsFromLazada = async (req, res) => {
    try {
        await LazadaApi
            .getProducts({ filter: 'all' })
            .then(response => {
                // console.log(response);
                // console.log(response.data.products);
                // console.log(response.data.products[0].skus);
                res.status(200).json({
                    status: "success",
                    code: 200,
                    data: [response],
                    message: "get all products from lazada succes"
                })
            })
    } catch (error) {
        res.status.json({
            status: "error",
            code: 500,
            message: error
        })
    }
    res.end();
}