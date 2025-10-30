const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: String, // or mongoose.Schema.Types.ObjectId with ref: "User"
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required:true
    },
    address: {
        type: Object,
        required:true
    },
    status: {
        type: String,
        required:true,
        default:'Order Placed'
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    payment: {
        type: Boolean,
        required: true,
        default: false
    },
    razorpayOrderId: { // <-- ADD THIS
        type: String,
        default: null
    },
    subCategory: {
        type: String,
    },
    sizes: {
        type: Array,
        required: true,
    },
    date: {
        type: Number, // or recommend: type: Date
        required: true,
    }
},{timestamps:true})

const Order = mongoose.model("Order",orderSchema);
module.exports = Order ;
