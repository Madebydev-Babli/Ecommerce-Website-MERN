import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthDataContext } from "./authContext";
import axios from "axios";

export const ShopDataContext = createContext();

const ShopContext = ({ children }) => {
  const [Products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState({}); // 🛒 { productId: { size: { qty } } }
  const { serverUrl } = useContext(AuthDataContext);

  const currency = "₹";
  const delivery_fee = 40;

  // ✅ Fetch products
  const getProduct = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/product/list`, { withCredentials: true });
      setProducts(result.data);
    } catch (error) {
      console.error("Get Products Error:", error);
    }
  };

  // ✅ Fetch cart from backend
  const getCart = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/cart`, { withCredentials: true });
      setCart(result.data || {});
    } catch (error) {
      console.error("Get Cart Error:", error);
    }
  };

  useEffect(() => {
    getProduct();
    getCart();
  }, []);

  // ✅ Add to cart
 // ✅ Add to cart (guaranteed safe)
 const addToCart = async (productId, size) => {
  try {
    let result = await axios.post(
      `${serverUrl}/api/cart/add`,
      { productId, size, qty: 1 },
      { withCredentials: true }
    );

    // ✅ Merge instead of overwrite
    setCart(prevCart => {
      let updatedCart = { ...prevCart };
      Object.entries(result.data).forEach(([pid, sizes]) => {
        if (!updatedCart[pid]) updatedCart[pid] = {};
        Object.entries(sizes).forEach(([sz, data]) => {
          if (!updatedCart[pid][sz]) updatedCart[pid][sz] = { qty: 0 };
          updatedCart[pid][sz].qty = data.qty;
        });
      });
      return updatedCart;
    });
  } catch (error) {
    console.log("Add to Cart Error:", error);
  }
};


  // ✅ Update quantity (safe)
  const updateQty = async (productId, size, qty) => {
    try {
      let result = await axios.put(
        `${serverUrl}/api/cart/update`,
        { productId, size, qty },
        { withCredentials: true }
      );
  
      console.log("🟢 Update Response from backend:", result.data);
  
      setCart(prevCart => {
        let updatedCart = { ...prevCart };
  
        // Check both cases
        if (result.data.cart && result.data.cart[productId]) {
          updatedCart[productId] = result.data.cart[productId];
        } else if (result.data[productId]) {
          updatedCart[productId] = result.data[productId];
        } else {
          console.warn("⚠ Product not found in update response, removing:", productId);
          delete updatedCart[productId];
        }
  
        console.log("🟡 Updated Cart (frontend state):", updatedCart);
        return updatedCart;
      });
    } catch (error) {
      console.log("❌ Update Cart Error:", error);
    }
  };

  // ✅ Remove from cart
  const removeFromCart = async (productId, size) => {
    try {
      let result = await axios.delete(`${serverUrl}/api/cart/remove`, {
        data: { productId, size },
        withCredentials: true,
      });
  
      setCart(prevCart => {
        let updatedCart = { ...prevCart };
        if (result.data[productId]) {
          updatedCart[productId] = result.data[productId];
        } else {
          delete updatedCart[productId];
        }
        return updatedCart;
      });
    } catch (error) {
      console.log("Remove Cart Error:", error);
    }
  };

  // ✅ Clear cart (frontend only)
  const clearCart = () => {
    setCart({});
  };

  const value = {
    currency,
    delivery_fee,
    Products,
    getProduct,
    searchQuery,
    setSearchQuery,
    cart,
    getCart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
  };

  return <ShopDataContext.Provider value={value}>{children}</ShopDataContext.Provider>;
};

export default ShopContext;