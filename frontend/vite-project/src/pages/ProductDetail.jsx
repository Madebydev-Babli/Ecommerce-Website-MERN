import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShopDataContext } from "../context/ShopContext";
import Card from "../components/Card";

export default function ProductDetail() {
  const { id } = useParams();
  const { currency, Products, addToCart } = useContext(ShopDataContext);

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const found = Products.find((item) => item._id === id);
    if (found) {
      setProduct(found);
      setActiveImage(found.image1);
    }
  }, [id, Products]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen text-[#5A4A3F] text-lg">
        Loading product...
      </div>
    );
  }

  const related = Products.filter(
    (p) =>
      p._id !== product._id &&
      (p.category === product.category || p.subCategory === product.subCategory)
  ).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes?.length > 0) {
      setPopup("Please select a size first!");
      setTimeout(() => setPopup(false), 1500);
      return;
    }
    addToCart(product._id, selectedSize);
    setPopup("✅ Added to Cart!");
    setTimeout(() => setPopup(false), 1500);
  };

  return (
    <div className="pt-28 px-2 sm:px-6 max-w-7xl mx-auto space-y-14 bg-gradient-to-tr from-[#FFF9F2] via-[#EBDED7] to-[#FFE6DB] min-h-screen">
      {/* Product Section */}
      <div className="grid lg:grid-cols-2 gap-8 xl:gap-16 bg-white/80 backdrop-blur rounded-3xl shadow-2xl p-5 md:p-9 border border-[#eee7e0]">
        {/* Left: Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center gap-6"
        >
          <div className="relative w-full h-[280px] sm:h-[370px] xl:h-[430px] rounded-2xl bg-gradient-to-br from-[#F7E1C5] to-[#EEC7B0] flex items-center justify-center overflow-hidden border border-[#edd4c9] shadow-md">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-[260px] sm:h-[360px] xl:h-[410px] object-contain rounded-lg"
            />
          </div>

          <div className="flex gap-3 mt-1 sm:mt-2 flex-wrap justify-center">
            {[product.image1, product.image2, product.image3, product.image4].map(
              (img, i) =>
                img && (
                  <img
                    key={i}
                    src={img}
                    alt="thumbnail"
                    className={`h-16 w-16 sm:h-20 sm:w-20 object-contain rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      activeImage === img
                        ? "border-[#A6715A] scale-105 shadow-md bg-[#fff2e4]"
                        : "border-[#E2C4B3] hover:border-[#C19A8B] bg-white"
                    }`}
                    onClick={() => setActiveImage(img)}
                  />
                )
            )}
          </div>
        </motion.div>

        {/* Right: Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col space-y-7 justify-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#3B2F2F]">{product.name}</h1>
          <span className="inline-block px-4 py-1 bg-[#F8EFEA] border border-[#EDD6E3] rounded-full font-semibold text-[#6E5B50] text-base capitalize self-start">
            {product.category}
          </span>
          <p className="text-2xl font-semibold text-[#A6715A] flex items-center gap-2 mt-1">
            {currency}{product.price}
            {product.crossedPrice && (
              <span className="line-through text-lg text-gray-500 font-normal ml-3">{currency}{product.crossedPrice}</span>
            )}
          </p>

          <p className="text-[#4E3D35] leading-relaxed mb-2">{product.description || "No description available."}</p>

          {product.sizes?.length > 0 && (
            <div>
              <span className="block mb-2 font-medium text-[#8C6347] text-base">
                Select Size:
              </span>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-5 py-2 rounded-xl font-bold border transition-all duration-200 text-base ${
                      selectedSize === s
                        ? "bg-[#A6715A] text-white border-[#A6715A] shadow-md scale-105"
                        : "bg-white text-[#4E3D35] border-[#E2C4B3] hover:border-[#C19A8B]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-br from-[#A6715A] to-[#f6bba6] text-white px-8 py-3 rounded-xl shadow-lg font-bold text-lg hover:bg-[#8C5F49] transition-all self-start mt-3"
            onClick={handleAddToCart}
          >
            Add to Cart
          </motion.button>
        </motion.div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-5 text-[#3B2F2F]">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {related.map((rp) => (
              <motion.div
                key={rp._id}
                whileHover={{ scale: 1.04, boxShadow: "0 4px 18px #fae1d0" }}
                className="cursor-pointer"
                onClick={() => navigate(`/productdetail/${rp._id}`)}
              >
                <Card product={rp} currency={currency} />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Popup Animation */}
      <AnimatePresence>
        {!!popup && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.97 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-gradient-to-r from-[#A6715A] to-[#f6bba6] text-white px-7 py-3 rounded-2xl shadow-lg border-[2.5px] border-[#C2A092] font-semibold text-base z-50"
          >
            {popup}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
