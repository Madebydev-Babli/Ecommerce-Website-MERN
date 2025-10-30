import React, { memo, useContext } from "react";
import { LogOut } from "lucide-react";
import { GiLargeDress } from "react-icons/gi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../context/AuthContext";
import { AdminDataContext } from "../context/AdminContext";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();
  const { serverUrl } = useContext(AuthDataContext);
  const { getAdmin } = useContext(AdminDataContext);

  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      toast.success("Logged out successfully ");
      getAdmin();
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed. Try again!");
    }
  };

  return (
    <header
      className="w-full bg-[#4b2f25] shadow-md fixed top-0 left-0 z-40 border-b border-[#E2C4B3]/50"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Brand */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <GiLargeDress className="h-10 w-10 text-black bg-[#fff8f6] rounded-full border-4 border-[#f5ebe7]/40 shadow-sm" />
          <span className="font-semibold text-2xl tracking-wide text-[#f5ebe7]">
            WishCart
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-[#A6715A] text-white px-4 py-2 rounded-lg hover:bg-[#8b5a44] transition-all shadow-md"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

export default memo(Navbar)
