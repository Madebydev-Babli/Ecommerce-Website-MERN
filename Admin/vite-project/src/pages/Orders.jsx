import React, { useContext, useEffect, useState, memo } from "react";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Nav from "../components/Nav";
import { motion, AnimatePresence } from "framer-motion";
import "../index.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { serverUrl } = useContext(AuthDataContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/order/all`, {
          withCredentials: true,
        });
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [serverUrl]);

  const updateStatus = async (orderId, status) => {
    try {
      await axios.post(
        `${serverUrl}/api/order/status`,
        { orderId, status },
        { withCredentials: true }
      );
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status } : o))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-[#f3e0de] via-[#f9e6e3] to-[#fff] flex">
      {/* Sidebar: fixed on desktop, not fixed on mobile */}
      <div className="hidden sm:block fixed left-0 top-0 h-screen w-64 z-30 bg-[#f3e0de] border-r border-[#ead1c3]/80 shadow">
        <Sidebar />
      </div>
      {/* Main content: push for sidebar only on desktop */}
      <div className="flex-1 flex flex-col w-full sm:ml-64">
        <Nav />
        <div className="flex flex-col flex-1 items-center relative px-2 sm:px-4 lg:px-8 mt-16 w-full overflow-y-auto pb-12">
          {/* Animated header */}
          <motion.h2
            className="text-2xl lg:text-3xl font-bold mb-6 text-[#6b302c] drop-shadow-sm text-center"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            📦 All Orders
          </motion.h2>

          {/* Rest of your orders/table/cards/modal unchanged */}
          {/* ... paste all content here, no changes needed ... */}

          {orders.length === 0 ? (
            <motion.p
              className="text-center text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No orders found.
            </motion.p>
          ) : (
            <motion.div
              className="w-full flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.3 }}
            >
              {/* Table for desktop/tablet */}
              <div className="hidden sm:block w-full">
                <motion.table
                  className="w-full text-xs sm:text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  <thead className="bg-[#fbeaea] text-[#6b302c]">
                    <tr>
                      <th className="p-2 sm:p-3 border">Order ID</th>
                      <th className="p-2 sm:p-3 border">Customer</th>
                      <th className="p-2 sm:p-3 border">User ID</th>
                      <th className="p-2 sm:p-3 border">Date</th>
                      <th className="p-2 sm:p-3 border">Amount</th>
                      <th className="p-2 sm:p-3 border">Status</th>
                      <th className="p-2 sm:p-3 border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, i) => {
                      const total = order.items.reduce(
                        (sum, item) =>
                          sum +
                          (item.price && item.quantity
                            ? item.price * item.quantity
                            : item.price || 0),
                        0
                      );
                      return (
                        <motion.tr
                          key={order._id}
                          className="hover:bg-[#fff6f5] transition-all duration-200 border-b border-[#f3d5d2]"
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.50, delay: i * 0.05 }}
                        >
                          <td className="p-2 sm:p-3 break-all">{order._id}</td>
                          <td className="p-2 sm:p-3">{order.address?.fullName || "N/A"}</td>
                          <td className="p-2 sm:p-3 break-all">{order.userId}</td>
                          <td className="p-2 sm:p-3 whitespace-nowrap">{new Date(order.date).toLocaleDateString()}</td>
                          <td className="p-2 sm:p-3 font-semibold text-[#6b302c]">₹{total}</td>
                          <td className="p-2 sm:p-3">
                            <select
                              value={order.status || "Pending"}
                              onChange={(e) =>
                                updateStatus(order._id, e.target.value)
                              }
                              className="border rounded-lg px-2 py-1 bg-[#fff8f7] text-xs sm:text-sm focus:border-[#a14236] focus:ring-2 focus:ring-[#f2b7ae]"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Paid">Paid</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-2 sm:p-3 text-center">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="bg-[#a14236] text-white px-3 py-1 rounded-lg text-xs sm:text-sm hover:bg-[#812f28] transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                              View
                            </button>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </motion.table>
              </div>

              {/* Mobile card view with animation */}
              <div className="block sm:hidden w-full space-y-4">
                {orders.map((order, i) => {
                  const total = order.items.reduce(
                    (sum, item) =>
                      sum + (item.price && item.quantity
                        ? item.price * item.quantity
                        : item.price || 0),
                    0
                  );
                  return (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      className="bg-[#fffdfc] border border-[#ecd1cd] rounded-xl shadow-md p-4"
                    >
                      <div className="mb-2">
                        <span className="font-semibold text-[#6b302c]">
                          Order ID:{" "}
                        </span>
                        <span className="break-all">{order._id}</span>
                      </div>
                      <div className="mb-1">
                        <span className="font-semibold text-[#6b302c]">
                          Customer:{" "}
                        </span>
                        {order.address?.fullName || "N/A"}
                      </div>
                      <div className="mb-1">
                        <span className="font-semibold text-[#6b302c]">
                          User ID:{" "}
                        </span>
                        <span className="break-all">{order.userId}</span>
                      </div>
                      <div className="mb-1">
                        <span className="font-semibold text-[#6b302c]">
                          Date:{" "}
                        </span>
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                      <div className="mb-1">
                        <span className="font-semibold text-[#6b302c]">
                          Amount:{" "}
                        </span>
                        ₹{total}
                      </div>
                      <div className="mb-2">
                        <span className="font-semibold text-[#6b302c]">
                          Status:{" "}
                        </span>
                        <select
                          value={order.status || "Pending"}
                          onChange={(e) =>
                            updateStatus(order._id, e.target.value)
                          }
                          className="border rounded-lg px-2 py-1 bg-[#fff8f7] text-xs focus:border-[#a14236] focus:ring-2 focus:ring-[#f2b7ae]"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="w-full bg-[#a14236] text-white px-3 py-1 rounded-lg text-xs hover:bg-[#812f28] transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        View
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Animated Order Popup */}
          <AnimatePresence>
            {selectedOrder && (
              <motion.div
                className="fixed inset-0 bg-[#00000065] backdrop-blur-[4px] flex justify-center items-center z-50 px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="relative bg-gradient-to-br from-[#fffaf9]/95 to-[#fdebea]/95 w-full max-w-lg p-5 lg:p-8 rounded-3xl shadow-2xl border border-[#f1c7c1] overflow-y-auto max-h-[90vh]"
                  initial={{ scale: 0.85, opacity: 0, y: 40 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.90, opacity: 0, y: 20 }}
                  transition={{ duration: 0.35, type: "spring" }}
                >
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="absolute top-4 right-4 text-[#a14236] hover:text-[#6b302c] text-2xl font-bold transition"
                  >
                    ✕
                  </button>
                  <h3 className="text-xl lg:text-2xl font-bold mb-4 text-[#6b302c] text-center">
                    🛍️ Order Details
                  </h3>
                  <p className="text-center text-xs lg:text-sm text-gray-600 mb-6">
                    Order ID:{" "}
                    <span className="font-medium break-all">
                      {selectedOrder._id}
                    </span>
                  </p>
                  <div className="space-y-4 max-h-60 lg:max-h-64 overflow-y-auto pr-2">
                    {selectedOrder.items.map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex flex-col lg:flex-row items-center lg:items-start gap-4 bg-white/70 p-4 rounded-xl border border-[#f1d3cf] shadow-sm hover:shadow-lg transition"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                      >
                        <img
                          src={item.image || "https://via.placeholder.com/80"}
                          alt={item.name || "Product"}
                          className="w-24 h-24 object-cover rounded-lg border border-[#f1c7c1]"
                        />
                        <div className="flex-1 text-center lg:text-left">
                          <p className="font-medium text-[#6b302c] text-base">
                            {item.name || "Unnamed Product"}
                          </p>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity || 1}
                          </p>
                          <p className="font-semibold text-gray-800 text-sm">
                            ₹{item.price || 0} × {item.quantity || 1} = ₹
                            {(item.price || 0) * (item.quantity || 1)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6 text-xs lg:text-sm bg-[#fff] p-4 lg:p-5 rounded-2xl border border-[#f1d3cf] shadow-md">
                    <h4 className="font-semibold text-[#6b302c] mb-2 text-center lg:text-left">
                      📍 Delivery Address
                    </h4>
                    {selectedOrder.address ? (
                      <p className="text-gray-700 leading-relaxed text-center lg:text-left">
                        <span className="font-medium">
                          {selectedOrder.address.fullName}
                        </span>
                        , {selectedOrder.address.street},{" "}
                        {selectedOrder.address.city},{" "}
                        {selectedOrder.address.state} -{" "}
                        {selectedOrder.address.zip},{" "}
                        {selectedOrder.address.country}
                        <br />
                        <span className="text-gray-600">
                          📞 {selectedOrder.address.phone}
                        </span>
                      </p>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default memo(AdminOrders);
