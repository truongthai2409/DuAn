const mongoose = require("mongoose");
const Product = new mongoose.Schema(
    {
        // key: {
        //     type: Number, 
        //     required: true 
        // },
        // id: { 
        //     type: String, 
        //     required: true 
        // },
        image: { 
            type: String, 
            required: true 
        },
        name: { 
            type: String, 
            required: true 
        },
        price: { 
            type: String, 
            required: true 
        },
        productDescription: { 
            type: String, 
            required: true 
        },
        inventory: { 
            type: Number, 
            required: true 
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("product", Product);