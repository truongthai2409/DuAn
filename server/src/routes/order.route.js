const express = require("express");
const { getAllOrdersFromLazada, getAllOrderItemsFromLazada, getAllOrdersController, SynchronizeLazadaOrders, changeOrderStatus } = require("../controllers/order.controllers");
const { Verify, verifiToken } = require("../middleware/verify.middlewares.js");
// const { upload } = require("../services/upload.service.js");

const orderRouters = express.Router();


orderRouters.get('/all-order-from-lazada', getAllOrdersFromLazada);

orderRouters.get('/all-order-items-from-lazada', getAllOrderItemsFromLazada);

orderRouters.get('/all-orders', Verify, getAllOrdersController);

orderRouters.get('/sync-orders-from-lazada', Verify, SynchronizeLazadaOrders);

orderRouters.put('/change-status', Verify, changeOrderStatus);


module.exports = orderRouters;