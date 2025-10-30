import React, { useEffect, useState, useContext } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";

const Home = () => {
  const { serverUrl } = useContext(AuthDataContext);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCounts = async () => {
    try {
      const [products, orders] = await Promise.all([
        axios.get(`${serverUrl}/api/product/list`, { withCredentials: true }),
        axios.get(`${serverUrl}/api/order/all`, { withCredentials: true }),
      ]);
      setTotalProducts(products.data.length);
      setTotalOrders(orders.data.length);
    } catch (err) {
      console.error("Failed to fetch counts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="w-screen h-screen flex bg-gradient-to-br from-[#DCC7B8] via-[#D6B2A4] to-[#C19A8B] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Nav />

        {/* Main Content */}
        <div className="flex flex-col flex-1 items-center justify-center relative px-4 md:px-8">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-[#3B2F2F] mb-12 tracking-wide text-center"
          >
            WishCart Admin Dashboard
          </motion.h1>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl justify-items-center"
          >
            {/* Products Card */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-[#F8EFEA] backdrop-blur-md border border-[#E2C4B3]/60 rounded-3xl shadow-lg p-8 w-72 text-center shadow-[#E2C4B3]/30"
            >
              <h2 className="text-lg font-semibold text-[#5A4A3F] mb-3">
                Total Products
              </h2>
              <p className="text-5xl font-extrabold text-[#A6715A]">
                {loading ? "..." : totalProducts}
              </p>
            </motion.div>

            {/* Orders Card */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-[#F8EFEA] backdrop-blur-md border border-[#E2C4B3]/60 rounded-3xl shadow-lg p-8 w-72 text-center shadow-[#E2C4B3]/30"
            >
              <h2 className="text-lg font-semibold text-[#5A4A3F] mb-3">
                Total Orders
              </h2>
              <p className="text-5xl font-extrabold text-[#A6715A]">
                {loading ? "..." : totalOrders}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
