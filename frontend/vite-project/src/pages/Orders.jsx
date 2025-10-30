import React, { useEffect, useState, useContext } from "react";
import { ShopDataContext } from "../context/ShopContext";
import { AuthDataContext } from "../context/authContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function Order() {
  const { currency, delivery_fee } = useContext(ShopDataContext);
  const { serverUrl } = useContext(AuthDataContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showStatusMap, setShowStatusMap] = useState({}); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${serverUrl}/api/order/userorder`, {
          withCredentials: true,
        });
        setOrders(data || []);
      } catch (error) {
        console.error("Fetch Orders Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [serverUrl]);

  const toggleStatus = (orderId) => {
    setShowStatusMap((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  if (loading)
    return <p className="text-center mt-10 text-lg font-medium">Loading orders...</p>;

  if (orders.length === 0)
    return <p className="text-center mt-10 text-lg font-medium">No orders found.</p>;

  return (
    <div className="max-w-3xl sm:max-w-5xl mx-auto p-2 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">My Orders</h1>
      {orders.map((order) => {
        const items = order.items || [];
        const subtotal = items.reduce(
          (sum, item) => sum + (item.price || 0) * (item.qty || 0),
          0
        );

        return (
          <div
            key={order._id}
            className="flex flex-col md:flex-row border rounded-lg shadow-md mb-8 p-4 bg-white"
          >
            {/* LEFT SIDE - Order Details */}
            <div className="md:w-2/3 w-full pr-0 md:pr-6 relative mb-8 md:mb-0">
              {/* Order ID */}
              <h2 className="text-lg sm:text-xl font-semibold mb-2 break-all">Order ID: {order._id}</h2>

              {/* Top-right button + status (absolute only on desktop) */}
              <div className="md:absolute md:top-3 md:right-4 flex flex-row md:flex-col items-center md:items-end gap-2 md:space-y-2 mb-3 md:mb-0">
                <button
                  onClick={() => toggleStatus(order._id)}
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm shadow-sm transition-all"
                >
                  {showStatusMap[order._id] ? "Hide Status" : "Track Order"}
                </button>
                {/* Animated Status below button */}
                <AnimatePresence>
                  {showStatusMap[order._id] && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="font-medium bg-gray-100 px-3 py-1 rounded-md shadow text-sm border mt-1"
                    >
                      <strong>Status:</strong> {order.status || "N/A"}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <p className="mt-2 sm:mt-8 text-sm">
                <strong>Placed on:</strong>{" "}
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
              <h3 className="mt-4 font-semibold text-base sm:text-lg">Items:</h3>
              <div className="space-y-4">
                {items.length > 0 ? (
                  items.map((item) => (
                    <div
                      key={item.productId || Math.random()}
                      className="flex flex-col sm:flex-row items-center gap-3 border-b pb-3"
                    >
                      <img
                        src={item.image || "https://via.placeholder.com/60"}
                        alt={item.name || "Product"}
                        className="w-20 h-20 sm:w-16 sm:h-16 object-cover rounded mb-2 sm:mb-0"
                      />
                      <div className="flex-1 text-center sm:text-left">
                        <p className="font-medium">{item.name || "Unnamed Product"}</p>
                        <p className="text-sm text-gray-600">
                          {item.size ? `Size: ${item.size}, ` : ""}Qty: {item.qty || 0}
                        </p>
                        <p className="text-sm font-semibold">
                          {currency}{item.price || 0} × {item.qty || 0} ={" "}
                          {currency}{(item.price || 0) * (item.qty || 0)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No items found in this order.</p>
                )}

                {/* Delivery Address */}
                <h3 className="mt-4 font-semibold">Delivery Address:</h3>
                {order.address ? (
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {order.address.firstname || ""} {order.address.lastname || ""},<br />
                    {order.address.street || ""}, {order.address.city || ""},{" "}
                    {order.address.state || ""} - {order.address.pinCode || ""},{" "}
                    {order.address.country || ""},<br />
                    Phone: {order.address.phone || "N/A"}, Email: {order.address.email || "N/A"}
                  </p>
                ) : (
                  <p>No delivery address available.</p>
                )}
              </div>
            </div>

            {/* RIGHT SIDE - Order Summary */}
            <div className="md:w-1/3 w-full bg-gray-100 p-4 rounded-lg mt-0 md:mt-0 md:ml-4 flex-shrink-0">
              <h3 className="text-lg font-semibold mb-2 text-center md:text-left">Order Summary</h3>
              <div className="flex justify-between py-1 text-sm">
                <span>Subtotal</span>
                <span>{currency}{subtotal}</span>
              </div>
              <div className="flex justify-between py-1 text-sm">
                <span>Shipping</span>
                <span>{currency}{delivery_fee}</span>
              </div>
              <div className="flex justify-between py-2 border-t font-bold text-lg">
                <span>Total</span>
                <span>{currency}{subtotal + delivery_fee}</span>
              </div>
              <div className="mt-4 text-center md:text-left">
                <span className="font-semibold">Payment:</span>{" "}
                {order.paymentMethod || "N/A"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
