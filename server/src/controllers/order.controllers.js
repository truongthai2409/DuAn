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

// exports.SynchronizeLazadaOrders = async (req, res) => {
//     try {
//         const user = req.user;
//         const { _id } = user;
//         let orders = []
//         const accesstoken = await AccessToken.findOne({})
//         const aLazadaAPIWithToken = new LazadaAPI("129821", "Kif9GhshgCtasv8nnVVF9IhsrgkCdeNO", 'VIETNAM', accesstoken.accesstoken)
//         let orderIds = []
//         let orderQuantitys = []
//         let orderPrices = []
//         let orderCustomers = []

//         await aLazadaAPIWithToken
//             .getOrders({ update_after: "2018-02-10T16:00:00+08:00", status: 'ready_to_ship' })
//             .then(response => {
//                 orderIds = response.data.orders.map(order => order.order_id);
//                 orderQuantitys = response.data.orders.map(order => order.items_count)
//                 orderPrices = response.data.orders.map(order => order.price)
//                 orderCustomers = response.data.orders.map(order => order.address_billing.first_name)
//             })
//             .catch(err => console.log(err))

//         await aLazadaAPIWithToken
//             .getMultipleOrderItems({ order_ids: JSON.stringify(orderIds) })
//             .then(response => {
//                 orders = response.data;
//             })
//             .catch(err => console.log(err))

//         const savedOrders = await Promise.all(orders.map(async (order, index) => {
//             // const { image, name, price, productDescription, inventory } = product;
//             const order_id_lazada = order.order_id;
//             const image = order.order_items[0].product_main_image;
//             const name_order = order.order_items[0].name;
//             const price = orderPrices[index];
//             const quantity = orderQuantitys[index];
//             const status = order.order_items[0].status;
//             const name_customer = orderCustomers[index];
//             const shipping_unit = order.order_items[0].shipping_provider_type;

//             const newOrder = new Order({
//                 order_id_lazada,
//                 image,
//                 name_order,
//                 price,
//                 quantity,
//                 status,
//                 name_customer,
//                 shipping_unit,
//                 user_id: _id
//             });
//             return await newOrder.save(); // Save each product into the database
//         }));

//         res.status(200).json({
//             status: "success",
//             data: savedOrders,
//             message: "All orders have been successfully created.",
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: "error",
//             code: 500,
//             message: error
//         })
//     }
// }

exports.SynchronizeLazadaOrders = async (req, res) => {
    try {
        const user = req.user;
        const { _id } = user;
        let allOrders = [];
        const accesstoken = await AccessToken.findOne({});
        const aLazadaAPIWithToken = new LazadaAPI("129821", "Kif9GhshgCtasv8nnVVF9IhsrgkCdeNO", 'VIETNAM', accesstoken.accesstoken);

        let statuses = ['pending', 'ready_to_ship', 'shipped', 'delivered', 'returned', 'canceled', 'failed']; // Các trạng thái đơn hàng
        let orderIds = [];
        let orderQuantitys = [];
        let orderPrices = [];
        let orderCustomers = [];

        // Dùng Promise.all để thực hiện nhiều lời gọi API đồng thời
        await Promise.all(statuses.map(async (status) => {
            await aLazadaAPIWithToken
                .getOrders({ update_after: "2018-02-10T16:00:00+08:00", status: status })
                .then(response => {
                    const orders = response.data.orders;
                    if (orders.length > 0) {
                        // Lưu các giá trị cần thiết
                        orderIds.push(...orders.map(order => order.order_id));
                        orderQuantitys.push(...orders.map(order => order.items_count));
                        orderPrices.push(...orders.map(order => order.price));
                        orderCustomers.push(...orders.map(order => order.address_billing.first_name));
                    }
                })
                .catch(err => console.log(`Error getting orders for status ${status}: `, err));
        }));

        // Chia nhỏ orderIds thành từng nhóm (batch) với tối đa 50 items
        const chunkArray = (arr, size) => {
            const chunks = [];
            for (let i = 0; i < arr.length; i += size) {
                chunks.push(arr.slice(i, i + size));
            }
            return chunks;
        };

        const orderIdChunks = chunkArray(orderIds, 50); // Mỗi chunk chứa tối đa 50 order_id

        // Duyệt qua từng nhóm order_ids và gọi getMultipleOrderItems
        for (const chunk of orderIdChunks) {
            await aLazadaAPIWithToken
                .getMultipleOrderItems({ order_ids: JSON.stringify(chunk) })
                .then(response => {
                    allOrders.push(...response.data); // Gộp tất cả các kết quả từ mỗi lần gọi
                })
                .catch(err => console.log("Error getting multiple order items: ", err));
        }

        // Lưu tất cả các đơn hàng vào cơ sở dữ liệu
        const savedOrders = await Promise.all(allOrders.map(async (order, index) => {
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

            return await newOrder.save();
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
    const { _id, status } = req.body;
    try {
        const updateStatus = await Order.findByIdAndUpdate(_id, {status}, { new: true });

        if (!updateStatus) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            status: "success",
            code: 200,
            data: [updateStatus],
            message: "Update status success"
        });
    } catch (error) {
        res.status(500).send(err.message);
    }
}