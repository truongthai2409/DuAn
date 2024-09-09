const Order = require("../models/Order.js");
const LazadaAPI = require('lazada-open-platform-sdk')
const AccessToken = require("../models/AccessToken.js")

exports.getAllOrdersFromLazada = async (req, res) => {
    try {
        const accesstoken = await AccessToken.findOne({})
        const aLazadaAPIWithToken = new LazadaAPI("129821", "Kif9GhshgCtasv8nnVVF9IhsrgkCdeNO", 'VIETNAM', accesstoken.accesstoken)
        await aLazadaAPIWithToken
            .getOrders({ update_after: "2018-02-10T16:00:00+08:00", status: 'returned' })
            .then(response => {
                res.status(200).json({
                    status: "success",
                    code: 200,
                    data: response,
                    message: "get all orders from lazada success"
                })
            })
            .catch(err => console.log(err))

    } catch (error) {
        res.status(500).json({
            status: "error",
            code: 500,
            message: error
        })
    }
    res.end();
}

exports.getAllOrderItemsFromLazada = async (req, res) => {
    try {
        // const { ids } = req.body
        const accesstoken = await AccessToken.findOne({})
        const aLazadaAPIWithToken = new LazadaAPI("129821", "Kif9GhshgCtasv8nnVVF9IhsrgkCdeNO", 'VIETNAM', accesstoken.accesstoken)

        let orderIds = []
        let orderQuantitys = []
        let orderPrices = []
        let orderCustomers = []

        await aLazadaAPIWithToken
            .getOrders({ update_after: "2018-02-10T16:00:00+08:00", status: 'ready_to_ship' })
            .then(response => {
                orderIds = response.data.orders.map(order => order.order_id);
                orderQuantitys = response.data.orders.map(order => order.items_count)
                orderPrices = response.data.orders.map(order => order.price)
                orderCustomers = response.data.orders.map(order => order.address_billing.address1)
            })
            .catch(err => console.log(err))

        console.log(orderCustomers[0]);
        

        await aLazadaAPIWithToken
            .getMultipleOrderItems({ order_ids: JSON.stringify(orderIds) })
            .then(response => {
                res.status(200).json({
                    status: "success",
                    code: 200,
                    data: response,
                    orders: {
                        quantities: orderQuantitys,
                        prices: orderPrices,
                        customers: orderCustomers
                    },
                    message: "get all order items from lazada success"
                })
            })
            .catch(err => console.log(err))


    } catch (error) {
        res.status(500).json({
            status: "error",
            code: 500,
            message: error
        })
    }
    res.end();
}

exports.SynchronizeLazadaOrders = async (req, res) => {
    try {
        const user = req.user;
        const { _id } = user;
        let orders = []
        const accesstoken = await AccessToken.findOne({})
        const aLazadaAPIWithToken = new LazadaAPI("129821", "Kif9GhshgCtasv8nnVVF9IhsrgkCdeNO", 'VIETNAM', accesstoken.accesstoken)
        let orderIds = []
        let orderQuantitys = []
        let orderPrices = []
        let orderCustomers = []

        await aLazadaAPIWithToken
            .getOrders({ update_after: "2018-02-10T16:00:00+08:00", status: 'ready_to_ship' })
            .then(response => {
                orderIds = response.data.orders.map(order => order.order_id);
                orderQuantitys = response.data.orders.map(order => order.items_count)
                orderPrices = response.data.orders.map(order => order.price)
                orderCustomers = response.data.orders.map(order => order.address_billing.first_name)
            })
            .catch(err => console.log(err))

        await aLazadaAPIWithToken
            .getMultipleOrderItems({ order_ids: JSON.stringify(orderIds) })
            .then(response => {
                orders = response.data;
            })
            .catch(err => console.log(err))

        const savedOrders = await Promise.all(orders.map(async (order, index) => {
            // const { image, name, price, productDescription, inventory } = product;
            const order_id_lazada = order.order_id;
            const image = order.order_items[0].product_main_image;
            const name_order = order.order_items[0].name;
            const price = orderPrices[index];
            const quantity = orderQuantitys[index];
            const status = order.order_items[0].status;
            const name_customer = orderCustomers[index];
            const shipping_unit = order.order_items[0].shipping_provider_type;

            const newOrder = new Order({
                order_id_lazada,
                image,
                name_order,
                price,
                quantity,
                status,
                name_customer,
                shipping_unit,
                user_id: _id
            });
            return await newOrder.save(); // Save each product into the database
        }));

        res.status(200).json({
            status: "success",
            data: savedOrders,
            message: "All orders have been successfully created.",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            code: 500,
            message: error
        })
    }
}

exports.getAllOrdersController = async (req, res) => {
    const user = req.user;
    const { _id } = user;
    try {
        const orders = await Order.find({ user_id: _id });
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.changeOrderStatus = async (req, res) => {
    
}