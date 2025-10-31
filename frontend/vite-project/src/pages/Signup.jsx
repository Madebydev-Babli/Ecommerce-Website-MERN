import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { userDataContext } from "../context/UserContext";
import { motion } from "framer-motion";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  let { serverUrl } = useContext(AuthDataContext);
  let { getCurrentUser } = useContext(userDataContext);
  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password } = formData;
      await axios.post(
        `${serverUrl}/api/auth/registration`,
        { name, email, password },
        { withCredentials: true }
      );
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      await axios.post(
        `${serverUrl}/api/auth/googlelogin`,
        { name: user.displayName, email: user.email },
        { withCredentials: true }
      );
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#E8D5C4] via-[#D2BBA0] to-[#B89982] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-[#F8EFEA]/90 backdrop-blur-xl border border-[#E2C4B3]/60 rounded-3xl p-8 shadow-2xl shadow-[#CBB6A2]/40"
      >
        {/* Title */}
        <h2 className="text-center text-3xl font-bold text-[#3B2F2F]">
          Create Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-[#7A6A58]">
          Join WishCart and start shopping in style ☕
        </p>

        {/* Google Button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={googleSignup}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#D8C2AF] bg-white px-4 py-3 text-[#5A4A3F] shadow-md hover:bg-[#F4EAE3] transition-all duration-300"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>
        </div>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <hr className="flex-grow border-[#D8C2AF]" />
          <span className="mx-3 text-sm text-[#9E8F7A]">or</span>
          <hr className="flex-grow border-[#D8C2AF]" />
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="w-full rounded-xl border border-[#E2C4B3] bg-[#FFF8F3]/80 px-4 py-3 text-[#3B2F2F] placeholder-[#9E8F7A] focus:ring-2 focus:ring-[#C19A8B]/50 focus:outline-none"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email Address"
            className="w-full rounded-xl border border-[#E2C4B3] bg-[#FFF8F3]/80 px-4 py-3 text-[#3B2F2F] placeholder-[#9E8F7A] focus:ring-2 focus:ring-[#C19A8B]/50 focus:outline-none"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="w-full rounded-xl border border-[#E2C4B3] bg-[#FFF8F3]/80 px-4 py-3 text-[#3B2F2F] placeholder-[#9E8F7A] focus:ring-2 focus:ring-[#C19A8B]/50 focus:outline-none"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-[#B89982] to-[#A6715A] px-4 py-3 font-semibold text-white shadow-md hover:from-[#A88771] hover:to-[#8C604B] transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-[#7A6A58]">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="font-semibold text-[#A6715A] hover:underline cursor-pointer"
          >
            Log In
          </span>
        </p>
      </motion.div>
    </div>
  );
}
