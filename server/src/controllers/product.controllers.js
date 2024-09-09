const Product = require("../models/Product.js");
const LazadaAPI = require('lazada-open-platform-sdk')
const AccessToken = require("../models/AccessToken.js")

exports.addProductExtensionController = async (req, res) => {
    const user = req.user;
    const { _id } = user
    const { image, name, price, productDescription, inventory } = req.body;
    try {
        const newProduct = new Product({
            image,
            name,
            price,
            productDescription,
            inventory,
            user_id: _id,
        });
        const savedProduct = await newProduct.save(); 
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

exports.addProductController = async (req, res) => {
    const user = req.user;
    const { _id } = user
    const { name, price, productDescription, inventory } = req.body;
    try {
        const image = "http://localhost:5000/" + req.file.path;
        // create an instance of a user
        const newProduct = new Product({
            image,
            name,
            price,
            productDescription,
            inventory,
            user_id: _id,
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
    const user = req.user;
    const { _id } = user;
    try {
        const products = await Product.find({user_id: _id});
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
        const user = req.user;
        const { _id } = user;
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
                inventory,
                user_id: _id
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

exports.updateProductController = async (req, res) => {
    const { _id } = req.body;
    const { name, price, productDescription, inventory } = req.body;
    const image = "http://localhost:5000/" + req.file.path;
    try {
        const updateData = {
            image,
            name,
            price,
            productDescription,
            inventory
        }

        const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            status: "success",
            code: 200,
            data: [updatedProduct],
            message: "Update product success"
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            message: err,
        });
    }
    res.end();
}

exports.getAProductsByIdController = async (req, res) => {
    const _id = req.params.id
    try {
        const product = await Product.findById(_id);
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteProductController = async (req, res) => {
    const { ids } = req.body;
    try {
        if (!Array.isArray(ids) || !ids.length) {
            return res.status(400).json({ 
                status: "failed",
                code: 400,
                message: 'Invalid or missing IDs' 
            });
        }
        // console.log(ids);
        const result = await Product.deleteMany({ _id: { $in: ids } });
        console.log(result);
        res.status(200).json({
            status: "success",
            code: 200,
            data: result,
            message: 'Delete product success'
        })
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            message: err,
        });
    }
    res.end()
}