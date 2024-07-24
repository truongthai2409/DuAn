// const express = require("express"); // import the express module

// const app = express(); // Create an app object

// const { Verify, VerifyRole } = require("../middlewares/verify.js")

// app.disable("x-powered-by"); // Reduce fingerprinting (optional)

// // home route with the get method and a handler
// app.get("/", (req, res) => {
//     try {
//         res.status(200).json({
//             status: "success",
//             data: [],
//             message: "Welcome to our API homepage!",
//         });
//     } catch (err) {
//         res.status(500).json({
//             status: "error",
//             message: "Internal Server Error",
//         });
//     }
// });

// app.get("/user", Verify, (req, res) => {
//     res.status(200).json({
//         status: "success",
//         message: "Welcome to the your Dashboard!",
//     });
// });

// app.get("/admin", Verify, VerifyRole, (req, res) => {
//     res.status(200).json({
//         status: "success",
//         message: "Welcome to the Admin portal!",
//     });
// });

// // const Auth = require('./auth.js');
// // app.use('/auth', Auth);

// const Product = require('./product.route.js');
// app.use('/product', Product)

// module.exports = app;