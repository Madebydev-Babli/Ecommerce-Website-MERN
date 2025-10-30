const express = require("express");
const { getCart, addToCart, updateCart, removeFromCart } = require("../controller/cartController")
const isAuth = require('../middleware/isAuth');
const cartRouter = express.Router();


cartRouter.get("/", isAuth, getCart);
cartRouter.post("/add", isAuth, addToCart);
cartRouter.put("/update", isAuth, updateCart);
cartRouter.delete("/remove", isAuth, removeFromCart);

module.exports = cartRouter;