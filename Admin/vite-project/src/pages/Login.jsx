import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext";
import { AdminDataContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { serverUrl } = useContext(AuthDataContext);
  const { getAdmin } = useContext(AdminDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/adminlogin`,
        { email, password },
        { withCredentials: true }
      );
      console.log(result.data);
      getAdmin();
      navigate("/");
      toast.success("Login successful!");
    } catch (error) {
      console.log(error);
      toast.error("Login failed! Please check email/password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#DCC7B8] via-[#D6B2A4] to-[#C19A8B]">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-[#F8EFEA]/90 backdrop-blur-md border border-[#E2C4B3]/60 rounded-3xl shadow-lg p-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-[#3B2F2F] text-center mb-8 tracking-wide">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-[#5A4A3F] font-semibold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              className="w-full px-4 py-2 border border-[#E2C4B3]/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#A6715A]"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[#5A4A3F] font-semibold mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 border border-[#E2C4B3]/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#A6715A]"
              required
            />
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 bg-[#A6715A] text-white font-semibold rounded-2xl shadow-md hover:bg-[#8F5A45] transition duration-300"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
