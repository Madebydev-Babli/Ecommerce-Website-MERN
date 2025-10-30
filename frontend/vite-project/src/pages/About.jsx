import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Sparkles, Heart, Star } from "lucide-react";
import wishcart from "../assets/optimized/wishcart.jpg";

const About = () => {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-[#F9E7DD] via-[#E7CBB5] to-[#DAB29F] text-[#3B2F2F] overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative py-24 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-6 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-[#8B5E3C] to-[#C38E70]"
        >
          About Wishcart
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-[#5A4A3F] leading-relaxed"
        >
          Where fashion meets comfort. At Wishcart, we believe everyone deserves to look
          stylish without compromising quality or affordability.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="absolute inset-0 -z-10"
        >
          <div className="absolute w-64 h-64 bg-[#E2C4B3]/30 blur-3xl rounded-full top-10 left-1/4"></div>
          <div className="absolute w-72 h-72 bg-[#C19A8B]/30 blur-3xl rounded-full bottom-10 right-1/4"></div>
        </motion.div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 px-6 md:px-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.img
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          src={wishcart}
          alt="Wishcart Fashion"
          className="rounded-[2rem] shadow-2xl border border-[#E2C4B3]/40"
        />
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="text-[#A6715A]" /> Who We Are
          </h2>
          <p className="text-[#5A4A3F] text-lg mb-4 leading-relaxed">
            Born from a love for fashion, Wishcart is your go-to destination for modern
            trends and timeless essentials. Our collections are curated with care, 
            reflecting comfort, confidence, and creativity.
          </p>
          <p className="text-[#5A4A3F] text-lg leading-relaxed">
            Every outfit you wear tells your story — we just help you write it beautifully.
          </p>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-24 px-6 md:px-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-12 text-[#3B2F2F]"
        >
          Why Choose Wishcart
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 justify-items-center">
          {[
            {
              icon: <Star className="w-10 h-10 text-[#A6715A] mx-auto mb-4" />,
              title: "Trendy Collections",
              desc: "Explore curated collections with the latest designs to keep your wardrobe effortlessly stylish.",
            },
            {
              icon: <Heart className="w-10 h-10 text-[#A6715A] mx-auto mb-4" />,
              title: "Affordable Luxury",
              desc: "Fashion that feels premium without the premium price tag — style made for everyone.",
            },
            {
              icon: <CheckCircle className="w-10 h-10 text-[#A6715A] mx-auto mb-4" />,
              title: "Quality Assurance",
              desc: "Every product is tested for comfort, durability, and design finesse — because you deserve the best.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-[#FFF8F4]/80 backdrop-blur-xl border border-[#E2C4B3]/60 rounded-3xl shadow-lg p-8 w-80 text-center"
            >
              {item.icon}
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-[#5A4A3F] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="absolute inset-0 -z-10">
          <div className="absolute w-96 h-96 bg-[#F8EFEA]/40 blur-3xl rounded-full top-20 left-1/2 -translate-x-1/2"></div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-8 bg-[#F8EFEA]/70 backdrop-blur-xl border-t border-[#E2C4B3]/50 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold mb-6"
        >
          Our Mission
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="max-w-3xl mx-auto text-lg text-[#5A4A3F] leading-relaxed"
        >
          To empower individuals to express themselves through fashion that’s 
          sustainable, stylish, and made with heart. Every purchase from Wishcart 
          supports our vision of making style accessible — one outfit at a time.
        </motion.p>
      </section>
    </div>
  );
};

export default About;
