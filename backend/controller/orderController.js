const Order = require("../model/orderModel");
const User = require("../model/userModel");
const Razorpay = require("razorpay");
const sendEmail = require("../utils/sendEmail");


const currency = "INR";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// COD order
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const newOrder = new Order({
      items,
      amount,
      userId,
      address,
      paymentMethod: "COD",
      payment: false,
      status: "Order Placed",
      date: Date.now(),
    });

    await newOrder.save();
    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(201).json({ message: "Order Placed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Order Placed error: ${error}`});
  }
};

// Razorpay order
const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const options = {
      amount: amount * 100, // amount in paise
      currency,
      receipt: `order_rcptid_${Date.now()}`,
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    // Save order in DB with Razorpay order ID
    const newOrder = new Order({
      items,
      amount,
      userId,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      status: "Pending Payment",
      razorpayOrderId: razorpayOrder.id, // add this field in schema
      date: Date.now(),
    });

    await newOrder.save();
    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(201).json(razorpayOrder);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Razorpay Order Placed error: ${error}` });
  }
};


const verifyRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
    const { razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { payment: true, status: "Order Placed" }
      );
      await User.findByIdAndUpdate(userId, { cartData: {} });

      return res.status(200).json({ 
        success:true,
        message: "Payment Successful" });
    } else {
      return res.status(400).json({ 
        success:false,
        message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `verifyRazorpayError: ${error.message}` });
  }
};

// User orders
const userOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId });
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json(`{ message: userOrder error: ${error} }`);
  }
};

// Admin orders
const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `adminAllOrder error: ${error} `});
  }
};

// Update status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // 1️⃣ Find order + user email
    const order = await Order.findById(orderId).populate("userId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 2️⃣ Update status
    order.status = status;
    await order.save();

    // 3️⃣ Send email notification
    await sendEmail(
      order.userId.email,
      "Order Status Updated",
      `
        <h2>Your order status has been updated 🚀</h2>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Your Order is:</strong> ${status}</p>
        <p>Thank you for shopping with us 💛</p>
      `
    );

    // 4️⃣ Response
    return res.status(200).json({
      message: "Status updated and email sent successfully",
    });
  } catch (error) {
    console.error("updateStatus error:", error);
    return res.status(500).json({
      message: "Something went wrong while updating status",
    });
  }
};

module.exports = {
  placeOrder,
  placeOrderRazorpay,
  userOrder,
  allOrders,
  updateStatus,
  verifyRazorpay,
};