const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String
    },
    cartData:{
        type:mongoose.Schema.Types.Mixed,
        default:{}
    }

},{timestamps:true,minimize:false})

const User = mongoose.model("User",userSchema);

module.exports = User;