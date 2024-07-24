const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { createServer } = require("http")
const { PORT } = require("./src/config/index.js");
const { db } = require('./src/services/db.service');
const authRouters = require("./src/routes/auth.route.js");
const userRouters = require("./src/routes/user.route.js");
const customerRouters = require("./src/routes/customer.route.js");
const adminRouters = require("./src/routes/admin.route.js");

const app = express();
const httpServer = createServer(app);

db.connect();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}));

httpServer.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);

app.disable("x-powered-by"); 
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/auth', authRouters);
app.use('/user', userRouters);
app.use('/admin', adminRouters);
app.use('/customer', customerRouters);
app.use('/product', userRouters);

// app.use('admin');