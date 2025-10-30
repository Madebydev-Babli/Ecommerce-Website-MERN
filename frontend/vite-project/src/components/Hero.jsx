import React from "react";
import { FaCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const Hero = ({ heroData, heroCount, setHeroCount }) => {
  return (
    <div className="w-full md:w-[45%] h-full flex flex-col justify-center items-start pl-[8%] relative z-10">
      
      {/* Frosted Glass Text Box */}
      <motion.div
        key={heroCount}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="backdrop-blur-md bg-white/40 border border-white/30 rounded-3xl shadow-lg p-6 md:p-10 max-w-[90%] md:max-w-[80%]"
      >
        <p className="text-[#3B2F2F] text-2xl md:text-4xl lg:text-5xl font-semibold tracking-wide leading-snug drop-shadow-sm">
          {heroData.text1}
        </p>
        <p className="text-[#5E4640] text-lg md:text-2xl lg:text-3xl font-medium opacity-90 mt-3 drop-shadow-sm">
          {heroData.text2}
        </p>
      </motion.div>

      {/* Animated Circle Indicators */}
      <motion.div
        className="flex gap-4 absolute bottom-[10%] left-[8%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.2 }}
            onClick={() => setHeroCount(i)}
            className={`cursor-pointer transition-all duration-300 ${
              heroCount === i
                ? "scale-125 drop-shadow-md"
                : "opacity-70"
            }`}
          >
            <FaCircle
              className={`w-4 h-4 ${
                heroCount === i ? "fill-[#E07A7A]" : "fill-[#C6A9A1]"
              }`}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Hero;
