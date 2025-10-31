import React, { useContext, useState } from "react";
import {
  FaUser,
  FaShoppingCart,
  FaSearch,
  FaShoppingBag,
  FaInfoCircle,
  FaSignOutAlt,
  FaSignInAlt,
  FaHome,
  FaEnvelope,
  FaStore, 
} from "react-icons/fa";
import { GiLargeDress } from "react-icons/gi";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ShopDataContext } from "../context/ShopContext";

export default function Nav() {
  let { userData, getCurrentUser } = useContext(userDataContext);
  let [showSearch, setShowSearch] = useState(false);
  let [showProfile, setShowProfile] = useState(false);
  let { serverUrl } = useContext(AuthDataContext);
  let { cart, setSearchQuery, searchQuery } = useContext(ShopDataContext);
  let navigate = useNavigate();

  // If cart is empty/null, badge shows nothing
let totalItems = 0;
if (cart) {
  Object.keys(cart).forEach(productId => {
    Object.values(cart[productId]).forEach(sizeObj => {
      totalItems += sizeObj.qty || 0;
    });
  });
}


  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      getCurrentUser();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#4b2f25] via-[#5c3a2f] to-[#7b5549] text-[#f5ebe7] shadow-md backdrop-blur-md border-b border-[#6b4a3d]/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo (an icon) */}
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <GiLargeDress className="h-10 w-10 text-black bg-[#fff8f6] rounded-full border-4 border-[#f5ebe7]/40 shadow-sm" />

              <span className="font-semibold text-2xl tracking-wide text-[#f9eae4]">
                WishCart
              </span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8">
              {["/", "/collection", "/about", "/contact"].map((path, i) => {
                const names = ["Home", "Shop", "About", "Contact"];
                return (
                  <Link
                    key={path}
                    to={path}
                    className="text-[#f5ebe7] hover:text-[#ffdac9] font-medium transition-colors duration-300"
                  >
                    {names[i]}
                  </Link>
                );
              })}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button
                className="text-[#f5ebe7] hover:bg-[#ffffff20] p-2 rounded-full transition"
                onClick={() => setShowSearch((prev) => !prev)}
              >
                <FaSearch className="text-lg" />
              </button>

              {/* Cart */}
              <div className="relative">
                <button
                  onClick={() => navigate("/cart")}
                  className="relative flex items-center justify-center text-[#f5ebe7] text-2xl hover:bg-[#ffffff20] p-2 rounded-full transition"
                >
                  <FaShoppingCart />
                </button>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[black] text-white text-[10px] px-[6px] py-[2px] rounded-full border border-white">
                    {totalItems}
                  </span>
                )}
              </div>

              {/* Profile */}
              <div className="relative">
                <div
                  className="flex items-center justify-center h-9 w-9 rounded-full bg-[#d99583] text-white cursor-pointer"
                  onClick={() => setShowProfile((prev) => !prev)}
                >
                  {userData
                    ? userData.name?.[0]?.toUpperCase()
                    : <FaUser className="text-lg" />}
                </div>

                {/* Profile Dropdown */}
                {showProfile && (
                  <ul className="absolute right-0 mt-2 w-56 bg-[#f7eee9] text-[#3c2f2f] rounded-xl shadow-lg border border-[#d3b8aa] z-50 overflow-hidden md:w-48">
                    <li className="px-4 py-3 flex items-center gap-3 border-b border-[#e2ccc1] bg-[#fffaf8]">
                      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-[#d99583] text-white font-semibold">
                        {userData
                          ? userData.name?.[0]?.toUpperCase()
                          : <FaUser className="text-sm" />}
                      </div>
                      <span className="font-medium text-sm">
                        {userData ? userData.name : "Guest User"}
                      </span>
                    </li>

                    {/* Mobile-only Links */}
                    <div className="md:hidden">
                      {[
                        { to: "/", icon: <FaHome />, label: "Home" },
                        { to: "/collection", icon: <FaStore />, label: "Shop / Collection" },
                        { to: "/about", icon: <FaInfoCircle />, label: "About" },
                        { to: "/contact", icon: <FaEnvelope />, label: "Contact" },
                      ].map((item, idx) => (
                        <li
                          key={idx}
                          className="px-4 py-2 hover:bg-[#f1e1d9] cursor-pointer flex items-center gap-2"
                          onClick={() => {
                            navigate(item.to);
                            setShowProfile(false);
                          }}
                        >
                          {item.icon} {item.label}
                        </li>
                      ))}
                    </div>

                    {/* Common Links */}
                    <li
                      className="px-4 py-2 hover:bg-[#f1e1d9] cursor-pointer flex items-center gap-2"
                      onClick={() => {
                        navigate("/orders");
                        setShowProfile(false);
                      }}
                    >
                      <FaShoppingBag /> Orders
                    </li>

                    {userData ? (
                      <li
                        className="px-4 py-2 hover:bg-[#f1e1d9] cursor-pointer flex items-center gap-2"
                        onClick={() => {
                          handleLogout();
                          setShowProfile(false);
                        }}
                      >
                        <FaSignOutAlt /> Logout
                      </li>
                    ) : (
                      <li
                        className="px-4 py-2 hover:bg-[#f1e1d9] cursor-pointer flex items-center gap-2"
                        onClick={() => {
                          navigate("/login");
                          setShowProfile(false);
                        }}
                      >
                        <FaSignInAlt /> Login
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="w-full h-[70px] bg-gradient-to-r from-[#5a3d33] via-[#6a4a3f] to-[#7b5a50] flex items-center justify-center shadow-inner animate-slideDown">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  navigate("/collection");
                }}
                className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] px-5 py-3 rounded-full bg-[#fdf8f6]/90 text-[#3c2f2f] placeholder-[#7b6258] border border-[#d9b8a7] focus:outline-none focus:ring-2 focus:ring-[#d99583] shadow-sm transition duration-300"
              />
          </div>
        )}
      </nav>

      <div className="pt-[67px]"></div>
    </>
  );
}
