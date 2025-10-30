import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ListOrdered,
  PlusSquare,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Detect screen size and update sidebar state
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024; 
      setIsMobile(mobile);
      setIsOpen(!mobile); 
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      {/* Toggle button (visible only on mobile/tablet) */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={toggleSidebar}
        className="p-2 lg:hidden fixed top-20 right-4 z-50 bg-[#A6715A] text-white rounded-lg shadow-md"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </motion.button>

      {/* Sidebar */}
      <motion.div
        initial={{ x: isMobile ? -200 : 0, opacity: isMobile ? 0 : 1 }}
        animate={{
          x: isOpen ? 0 : isMobile ? -220 : 0,
          opacity: isOpen ? 1 : isMobile ? 0 : 1,
        }}
        transition={{ duration: 0.4 }}
        className={`${
          isOpen ? "w-64" : isMobile ? "w-0" : "w-16"
        } bg-[#F8EFEA] h-screen border-r border-[#E2C4B3]/40 flex flex-col fixed lg:relative top-0 left-0 transition-all duration-300 pt-16 shadow-lg overflow-hidden z-40`}
      >
        <nav className="flex-1 p-4 space-y-4">
          {/* Dashboard */}
          <SidebarButton
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            isOpen={isOpen}
            onClick={() => {
              navigate("/");
              if (isMobile) setIsOpen(false);
            }}
          />

          {/* Orders */}
          <SidebarButton
            icon={<ShoppingCart size={20} />}
            text="View Orders"
            isOpen={isOpen}
            onClick={() => {
              navigate("/orders");
              if (isMobile) setIsOpen(false);
            }}
          />

          {/* List Items */}
          <SidebarButton
            icon={<ListOrdered size={20} />}
            text="List Items"
            isOpen={isOpen}
            onClick={() => {
              navigate("/list");
              if (isMobile) setIsOpen(false);
            }}
          />

          {/* Add Product */}
          <SidebarButton
            icon={<PlusSquare size={20} />}
            text="Add Product"
            isOpen={isOpen}
            onClick={() => {
              navigate("/add");
              if (isMobile) setIsOpen(false);
            }}
          />
        </nav>
      </motion.div>

      {/* Overlay (for mobile/tablet) */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}

const SidebarButton = ({ icon, text, isOpen, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.03, x: 5 }}
    onClick={onClick}
    className="w-full flex items-center gap-3 text-[#3B2F2F] hover:text-[#A6715A] hover:bg-[#E2C4B3]/30 rounded-lg px-3 py-2 transition text-left font-medium"
  >
    {icon}
    {isOpen && <span>{text}</span>}
  </motion.button>
);
