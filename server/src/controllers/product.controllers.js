const Product = require("../models/Product.js");
const LazadaAPI = require('lazada-open-platform-sdk')
const AccessToken = require("../models/AccessToken.js")


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
        const accesstoken = await AccessToken.findOne({})
        const aLazadaAPIWithToken = new LazadaAPI("129821", "Kif9GhshgCtasv8nnVVF9IhsrgkCdeNO", 'VIETNAM', accesstoken.accesstoken)
        await aLazadaAPIWithToken
            .getProducts({ filter: 'all' })
            .then(response => {
                res.status(200).json({
                    status: "success",
                    code: 200,
                    data: [response],
                    message: "get all products from lazada succes"
                })
            })
    } catch (error) {
        res.status(500).json({
            status: "error",
            code: 500,
            message: error
        })
    }
    res.end();
}

exports.SynchronizeLazadaProducts = async (req, res) => {
    try {
        let products = []
        const accesstoken = await AccessToken.findOne({})
        const aLazadaAPIWithToken = new LazadaAPI("129821", "Kif9GhshgCtasv8nnVVF9IhsrgkCdeNO", 'VIETNAM', accesstoken.accesstoken)
        await aLazadaAPIWithToken
            .getProducts({ filter: 'all' })
            .then(response => {
                products = [...response.data.products];
            })

        const savedProducts = await Promise.all(products.map(async (product) => {
            // const { image, name, price, productDescription, inventory } = product;
            const image = product.images[0];
            const name = product.attributes.name;
            const price = product.skus[0].price;
            const productDescription = product.attributes.description;
            const inventory = product.skus[0].quantity;
            const newProduct = new Product({
                image,
                name,
                price,
                productDescription,
                inventory
            });
            return await newProduct.save(); // Save each product into the database
        }));

        res.status(200).json({
            status: "success",
            data: savedProducts,
            message: "All products have been successfully created.",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            code: 500,
            message: error
        })
    }
}

exports.GetCategoryTreeLazada = async (req, res) => {
    try {
        const accesstoken = await AccessToken.findOne({})
        const aLazadaAPIWithToken = new LazadaAPI("129821", "Kif9GhshgCtasv8nnVVF9IhsrgkCdeNO", 'VIETNAM', accesstoken.accesstoken)
        await aLazadaAPIWithToken
        .getCategoryTree()
        .then(response => {
            res.status(200).json({
                status: "success",
                code: 200,
                data: response,
                message: "get category tree success"
            })
        })

    } catch (error) {
        res.status(500).json({
            status: "error",
            code: 500,
            message: error
        })
    }
}