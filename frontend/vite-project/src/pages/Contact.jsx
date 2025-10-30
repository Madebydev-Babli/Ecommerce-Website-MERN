import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import emailjs from 'emailjs-com'; 

const SERVICE_ID = "service_6e93975";    
const TEMPLATE_ID = "template_1lynwpm";   
const USER_ID = "Ws8a081cVL2ggYxM-";           

const Contact = () => {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, USER_ID)
      .then(() => {
        setSubmitted(true);
        setFormData({ email: "", message: "" });
        setLoading(false);
      })
      .catch(() => {
        setErrorMsg("❌ Something went wrong. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-[#F9E7DD] via-[#E7CBB5] to-[#DAB29F] text-[#3B2F2F] flex flex-col items-center overflow-hidden">
      {/* Hero Section */}
      <section className="py-16 px-6 text-center max-w-4xl relative">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-6 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-[#8B5E3C] to-[#C38E70]"
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg text-[#5A4A3F]"
        >
          Have questions or want to collaborate with BuiltbyBabli? Our Wishcart team is here to assist you.
        </motion.p>
        {/* Background blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-64 h-64 bg-[#E2C4B3]/30 blur-3xl rounded-full top-10 left-1/3"></div>
          <div className="absolute w-72 h-72 bg-[#C19A8B]/30 blur-3xl rounded-full bottom-10 right-1/3"></div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 px-6 md:px-20 grid md:grid-cols-2 gap-12 max-w-6xl w-full">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-[#5A4A3F]">
            Whether it’s a question about your order, our products, or collaborations, our team is ready to answer.
          </p>

          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <Mail className="text-[#A6715A] w-6 h-6" />
              <span>support@wishcart.com</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-[#A6715A] w-6 h-6" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="text-[#A6715A] w-6 h-6" />
              <span>New Delhi, India</span>
            </li>
          </ul>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#FFF8F4]/80 backdrop-blur-xl border border-[#E2C4B3]/60 rounded-3xl shadow-2xl p-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Collaborate / Contact</h2>
          {submitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 text-green-600 font-medium"
            >
              Thank you! We will get back to you soon.
            </motion.p>
          )}
          {errorMsg && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 text-red-600 font-medium"
            >
              {errorMsg}
            </motion.p>
          )}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-[#5A4A3F] mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 rounded-lg border border-[#E2C4B3]/60 focus:ring-2 focus:ring-[#C19A8B] focus:outline-none bg-white text-[#3B2F2F] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5A4A3F] mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message / Collaboration Idea"
                required
                className="w-full px-4 py-3 rounded-lg border border-[#E2C4B3]/60 focus:ring-2 focus:ring-[#C19A8B] focus:outline-none bg-white text-[#3B2F2F] resize-none h-32 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#A6715A] text-white font-semibold py-3 rounded-lg hover:bg-[#8B573E] transition-transform transform hover:scale-105 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
