const express = require("express");
const isAuth = require("../middleware/isAuth");
const AdminAuth = require("../middleware/AdminAuth");
const { placeOrder, userOrder, allOrders, updateStatus, placeOrderRazorpay, verifyRazorpay } = require("../controller/orderController");
const orderRouter = express.Router();

//for user
orderRouter.post("/placeorder", isAuth, placeOrder);
orderRouter.post("/razorpay", isAuth, placeOrderRazorpay);
orderRouter.get("/userorder", isAuth, userOrder);
orderRouter.post("/verifyrazorpay", isAuth, verifyRazorpay);

//for admin
orderRouter.get("/all", AdminAuth, allOrders);
orderRouter.post("/status", AdminAuth, updateStatus);

module.exports = orderRouter;
