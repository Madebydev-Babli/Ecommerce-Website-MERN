import React, { useContext } from "react";
import { ShopDataContext } from "../context/ShopContext";
import Card from "./Card";
import { motion } from "framer-motion";

export default function BestSeller() {
  const { Products, currency } = useContext(ShopDataContext);
  const best = Products.filter((p) => p.bestSeller === true).slice(0, 8);

  return (
    <section className="bg-gradient-to-br from-[#e6d3c9] via-[#e2bfb2] to-[#d9a699] py-16 px-0 sm:px-4 md:px-8">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center text-[#3B2F2F] mb-10"
      >
        Best Sellers
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center"
      >
        {best.map((p, i) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
            className="w-full max-w-[260px]" 
          >
            <Card product={p} currency={currency} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
