import React, { useContext, useEffect, useState } from "react";
import { ShopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    cart,
    Products,
    currency,
    delivery_fee,
    updateQty,
    removeFromCart,
  } = useContext(ShopDataContext);

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Flatten cartData (IDs + qty + size) → full product info
  useEffect(() => {
    if (Products.length > 0 && cart) {
      let items = [];
      Object.keys(cart).forEach(productId => {
        const product = Products.find(p => p._id === productId);
        if (product && cart[productId]) {
          Object.keys(cart[productId]).forEach(size => {
            if (cart[productId][size]) {
              items.push({
                ...product,
                _id: productId,
                qty: cart[productId][size].qty,
                size,
              });
            }
          });
        }
      });
      setCartItems(items);
    }
  }, [cart, Products]);

  // Totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const total = subtotal + delivery_fee;

  if (cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-2">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty 🛒</p>
          <button
            onClick={() => navigate("/collection")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-6 pb-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">
        Shopping Cart
      </h1>
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item._id + item.size}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 p-4 border rounded-lg shadow-sm bg-white"
          >
            {/* Image */}
            <img
              src={item.image1}
              alt={item.name}
              className="h-24 w-full sm:w-24 object-contain rounded-md bg-gray-50 mb-2 sm:mb-0"
            />

            {/* Details */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
              <p className="text-gray-500 text-sm">Category: {item.category}</p>
              {item.size && (
                <p className="text-sm text-gray-600">Size: {item.size}</p>
              )}
              <p className="text-indigo-600 font-bold mt-2">
                {currency}{item.price}
              </p>
            </div>

            {/* Quantity + Remove Controls */}
            <div className="flex flex-row sm:flex-col items-center gap-2 sm:gap-3 my-2 sm:my-0">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (item.qty > 1) {
                      updateQty(item._id, item.size, item.qty - 1);
                    } else {
                      removeFromCart(item._id, item.size);
                    }
                  }}
                  className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  -
                </button>
                <span className="font-semibold">{item.qty}</span>
                <button
                  onClick={() => updateQty(item._id, item.size, item.qty + 1)}
                  className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item._id, item.size)}
                className="text-red-600 hover:text-red-800 text-xs sm:text-sm font-medium ml-3 sm:ml-0"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="mt-8 p-4 sm:p-6 bg-gray-50 rounded-lg shadow-md w-full sm:max-w-xl mx-auto">
        <div className="flex flex-col gap-2 text-lg mb-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{currency}{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>{currency}{delivery_fee}</span>
          </div>
        </div>
        <div className="flex justify-between font-bold text-xl text-gray-800">
          <span>Total</span>
          <span>{currency}{total}</span>
        </div>

        <button
          onClick={() => navigate('/placeorder')}
          className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
