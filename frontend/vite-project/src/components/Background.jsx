import React from "react";
import { motion } from "framer-motion";
import back1 from "../assets/optimized/home1.webp";
import back2 from "../assets/optimized/home2.webp";
import back3 from "../assets/optimized/home3.webp";
import back4 from "../assets/optimized/home4.webp";

const Background = ({ heroCount }) => {
  const images = [back1, back2, back3, back4];

  return (
    <motion.img
      key={heroCount} // re-renders on change
      src={images[heroCount]}
      alt="Fashion Background"
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="absolute right-0 top-0 w-full md:w-[55%] h-full object-cover transition-all duration-700 ease-in-out rounded-l-[50px] shadow-2xl"
    />
  );
};

export default Background;
