const mongoose = require("mongoose");
const Order = new mongoose.Schema(
    {
        order_id_lazada: { 
            type: String, 
            required: true 
        },
        image: { 
            type: String, 
            required: true 
        },
        name_order: { 
            type: String, 
            required: true 
        },
        price: { 
            type: String, 
            required: true 
        },
        quantity: { 
            type: Number, 
            required: true 
        },
        status: { 
            type: String, 
            required: true 
        },
        name_customer: { 
            type: String, 
            required: true 
        },
        shipping_unit: { 
            type: String, 
            required: true 
        },
        user_id: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("order", Order);