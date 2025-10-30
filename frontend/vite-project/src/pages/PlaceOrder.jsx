import React, { useContext, useEffect, useState } from "react";
import { ShopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthDataContext } from "../context/authContext";
import toast from "react-hot-toast";

export default function PlaceOrder() {
  const { cart, Products, currency, delivery_fee, clearCart } =
    useContext(ShopDataContext);
  const { serverUrl } = useContext(AuthDataContext);

  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    paymentMethod: "COD",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (Products.length > 0 && cart) {
      let items = [];
      Object.keys(cart).forEach((productId) => {
        const product = Products.find((p) => p._id === productId);
        if (product) {
          Object.keys(cart[productId]).forEach((size) => {
            items.push({
              ...product,
              qty: cart[productId][size].qty,
              size,
            });
          });
        }
      });
      setCartItems(items);
    }
  }, [cart, Products]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const total = subtotal + delivery_fee;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (
      !form.firstname ||
      !form.lastname ||
      !form.email ||
      !form.phone ||
      !form.street ||
      !form.city ||
      !form.state ||
      !form.pinCode ||
      !form.country
    ) {
      toast.error("⚠ Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      if (form.paymentMethod === "RAZORPAY") {
        // 1️⃣ Create Razorpay order from backend
        const { data: order } = await axios.post(
          `${serverUrl}/api/order/razorpay`,
          {
            items: cartItems.map((i) => ({
              productId: i._id,
              size: i.size,
              qty: i.qty,
              name: i.name,
              price: i.price,
              image: i.image1,
            })),
            amount: total,
            address: {
              ...form,
              fullName: `${form.firstname} ${form.lastname}`,
            },
          },
          { withCredentials: true }
        );
      
        // 2️⃣ Initialize Razorpay Checkout
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: "WishCart",
          description: "Order Payment",
          order_id: order.id,
          handler: async function (response) {
            try {
              // 3️⃣ Verify payment on backend
              await axios.post(
                `${serverUrl}/api/order/verifyrazorpay`,
                { razorpay_order_id: response.razorpay_order_id },
                { withCredentials: true }
              );
              toast.success("✅ Payment Successful!");
              clearCart();
              navigate("/orders");
            } catch (err) {
              console.error("Payment Verification Failed:", err);
              toast.error("❌ Payment verification failed");
            }
          },
          prefill: {
            name: `${form.firstname} ${form.lastname}`,
            email: form.email,
            contact: form.phone,
          },
          theme: {
            color: "#6366f1",
          },
        };
      
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // COD
        await axios.post(`${serverUrl}/api/order/placeorder`, {
          items: cartItems.map((i) => ({
            productId: i._id,
            size: i.size,
            qty: i.qty,
            name: i.name,
            price: i.price,
            image: i.image1,
          })),
          amount: total,
          address: {
            ...form,
            fullName: `${form.firstname} ${form.lastname}`,
          },
          paymentMethod: "COD",
        }, { withCredentials: true });

        toast.success(" Order placed successfully!");
        clearCart();
        navigate("/orders");
      }
    } catch (error) {
      console.error("Place Order Error:", error);
      toast.error(" Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* LEFT SIDE - Delivery Info */}
      <div>
        <h2 className="text-2xl font-bold mb-6">DELIVERY INFORMATION</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={form.firstname}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={form.lastname}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-3 rounded w-full mt-4"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="border p-3 rounded w-full mt-4"
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={form.street}
          onChange={handleChange}
          className="border p-3 rounded w-full mt-4"
        />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            name="pinCode"
            placeholder="Pin Code"
            value={form.pinCode}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />
        </div>
      </div>

      {/* RIGHT SIDE - Cart Totals + Payment */}
      <div>
        <h2 className="text-2xl font-bold mb-6">CART TOTALS</h2>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="flex justify-between py-2">
            <span>Subtotal</span>
            <span>
              {currency}
              {subtotal}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span>Shipping Fee</span>
            <span>
              {currency}
              {delivery_fee}
            </span>
          </div>
          <div className="flex justify-between py-3 border-t font-bold text-lg">
            <span>Total</span>
            <span>
              {currency}
              {total}
            </span>
          </div>
        </div>

        {/* Payment Method */}
        <h2 className="text-2xl font-bold mt-8 mb-4">PAYMENT METHOD</h2>
        <div className="space-y-3">
          <button
            type="button"
            className={`w-full py-3 rounded-lg flex justify-center items-center gap-2 border ${
              form.paymentMethod === "RAZORPAY"
                ? "bg-indigo-100 border-indigo-600"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setForm({ ...form, paymentMethod: "RAZORPAY" })}
          >
            <img
              src="https://razorpay.com/favicon.png"
              alt="razorpay"
              className="h-5"
            />
            Pay with Razorpay
          </button>

          <button
            type="button"
            className={`w-full py-3 rounded-lg border ${
              form.paymentMethod === "COD"
                ? "bg-indigo-100 border-indigo-600"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setForm({ ...form, paymentMethod: "COD" })}
          >
            Cash on Delivery
          </button>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            {loading ? "Placing Order..." : "PLACE ORDER"}
          </button>
        </div>
      </div>
    </div>
  );
}
