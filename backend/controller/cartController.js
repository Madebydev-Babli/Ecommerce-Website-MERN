const User = require("../model/userModel")


// ✅ Get Cart
const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.cartData || {});
  } catch (err) {
    console.error("Get Cart Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// ✅ Add product to cart
const addToCart = async (req, res) => {
  try {
    const { productId, qty = 1, size } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let cart = {...(user.cartData || {})};

    if (!cart[productId]) {
      cart[productId] = {};
    }

    if (!cart[productId][size]) {
      cart[productId][size] = { qty: 0 };
    }

    cart[productId][size].qty += qty;

    user.cartData = cart;
    user.markModified("cartData");
    await user.save();

    res.json(user.cartData);
  } catch (err) {
    console.error("Add To Cart Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update product quantity in cart
const updateCart = async (req, res) => {
  try {
    const { productId, size, qty } = req.body;
    const user = await User.findById(req.userId);
    
    if (!user) return res.status(404).json({ message: "User not found" });

    let cart = user.cartData || {};

    if (!cart[productId]) {
      cart[productId] = {};
    }

    if (!cart[productId][size]) {
      cart[productId][size] = { qty: 0 };
    }

    if (qty <= 0) {
      delete cart[productId][size];
      if (Object.keys(cart[productId]).length === 0) {
        delete cart[productId];
      }
    } else {
      cart[productId][size].qty = qty;
    }

    user.cartData = cart;
    user.markModified("cartData");
    await user.save();

    res.json(user.cartData);
  } catch (err) {
    console.error("Update Cart Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const removeFromCart = async (req, res) => {
  try {
    const { productId, size } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let cart = { ...(user.cartData || {}) }; // clone

    if (cart[productId] && cart[productId][size]) {
      delete cart[productId][size];

      if (Object.keys(cart[productId]).length === 0) {
        delete cart[productId];
      }

      user.cartData = cart;
      user.markModified("cartData"); // ✅ force mongoose to detect changes
      await user.save();
    }

    res.json(user.cartData);
  } catch (err) {
    console.error("Remove From Cart Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
};