import React, { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Card = ({ product, currency }) => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  const optimizedImage =
    product.image1?.includes("/upload/")
      ? product.image1.replace("/upload/", "/upload/f_auto,q_auto,w_400/")
      : product.image1;

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        y: -5,
        boxShadow: "0 10px 20px rgba(90, 45, 36, 0.2)",
      }}
      transition={{ type: "spring", stiffness: 150 }}
      onClick={() => navigate(`/productdetail/${product._id}`)}
      className="w-full max-w-xs sm:max-w-[200px] md:max-w-[260px] 
                 bg-[#f7e9e2] border border-[#e2c4b3] rounded-2xl 
                 shadow-md overflow-hidden cursor-pointer transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative w-full h-48 sm:h-52 md:h-56 bg-[#f2d9d0] flex items-center justify-center">
        {/* Skeleton shimmer */}
        {!loaded && <div className="absolute inset-0 animate-pulse bg-[#e5c7ba]" />}

        <img
          src={optimizedImage}
          alt={product.name}
          title={product.name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-contain p-3 transition-all duration-700 
            ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        />
      </div>

      {/* Info Section */}
      <div className="p-3 sm:p-4 flex flex-col items-start space-y-1">
        <h3 className="font-semibold text-[#3B2F2F] truncate text-base sm:text-lg w-full">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm text-[#7b5548]">{product.category}</p>
        <p className="font-bold text-[#8c3b2f] mt-1 text-sm sm:text-base">
          {currency}
          {product.price}
        </p>
      </div>
    </motion.div>
  );
};

export default memo(Card);
