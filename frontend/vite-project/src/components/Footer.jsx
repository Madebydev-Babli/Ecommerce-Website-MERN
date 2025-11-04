import React from "react";
import { motion } from "framer-motion";
import { Mail, Instagram, Linkedin, Link2, ShoppingBag } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-gradient-to-r from-[#4E3B31] via-[#5C4336] to-[#6B4C3A] text-[#E8D8C3] border-t border-[#A58B77]/40 py-10 mt-12"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand/Logo + Motto */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-7 h-7" />
            <span className="text-xl font-bold tracking-wide">WishCart</span>
          </div>
          <p className="text-xs text-[#E8D8C3]/80">
            Dress your wish, every season.
          </p>
        </div>

        {/* Contact and Address */}
        <div className="flex flex-col items-center gap-1 text-xs">
          <span className="flex items-center gap-2">
            <Mail className="inline w-4 h-4" />
            <a href="mailto:madebybabli@gmail.com" className="hover:underline">
              support@wishcart.com
            </a>
          </span>
          <span>New Delhi, India</span>
        </div>

        {/* Navigation + Socials */}
        <div className="flex flex-col items-center gap-3">
          <a
            href="/contact"
            className="text-sm font-semibold hover:text-[#F3E3D1] transition"
          >
            Contact Us
          </a>
          {/* Socials: Instagram, LinkedIn, Fiverr */}
          <div className="flex gap-3 mt-1">
            <a href="https://www.instagram.com/builtbybabli/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="w-5 h-5 hover:text-pink-200 transition" />
            </a>
            <a href="https://www.linkedin.com/in/babli-chauhan/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5 hover:text-blue-200 transition" />
            </a>
            <a href="https://www.fiverr.com/babli_chauhan/" target="_blank" rel="noopener noreferrer" aria-label="Fiverr">
              <Link2 className="w-5 h-5 hover:text-green-200 transition" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-[#E8D8C3]/70">
        © {new Date().getFullYear()} WishCart — All Rights Reserved.
      </div>
    </motion.footer>
  );
}
