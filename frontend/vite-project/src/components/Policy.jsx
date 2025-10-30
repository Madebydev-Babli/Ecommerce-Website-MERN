import React from "react";
import { motion } from "framer-motion";
import { FaShippingFast, FaUndoAlt, FaHeadset } from "react-icons/fa";

export default function Policy() {
  const policies = [
    {
      icon: <FaShippingFast size={30} />,
      title: "Fast Delivery",
      desc: "Get your orders delivered quickly and safely.",
    },
    {
      icon: <FaUndoAlt size={30} />,
      title: "Easy Returns",
      desc: "Hassle-free 7-day return policy for all items.",
    },
    {
      icon: <FaHeadset size={30} />,
      title: "24/7 Support",
      desc: "Our team is here to help you anytime.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-[#F8EFEA] via-[#F3E2DB] to-[#E5C7BA] text-[#3B2F2F]">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-10"
      >
        Our Policies
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto px-6">
        {policies.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/70 backdrop-blur-md border border-[#E2C4B3]/60 rounded-2xl p-6 shadow-md hover:shadow-lg transition"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="text-[#A6715A]">{p.icon}</div>
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-sm text-[#5A4A3F]/80">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
