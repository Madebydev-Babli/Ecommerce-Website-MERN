import React, { useState, useEffect } from "react";
import Background from "../components/Background";
import Hero from "../components/Hero";
import Product from "../pages/Product";
import Policy from "../components/Policy";
import Footer from "../components/Footer";

const Home = () => {
  const heroData = [
    { text1: "30% OFF LIMITED OFFER", text2: "STYLE THAT DEFINES YOU" },
    { text1: "DISCOVER THE BEST OF BOLD FASHION", text2: "LIMITED TIME ONLY!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now!" },
    { text1: "Choose Your Perfect Fashion Fit", text2: "Now on Sale!" },
  ];

  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prev) => (prev === 3 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden relative bg-gradient-to-br from-[#FDF8F6] via-[#F8EAE5] to-[#F5D7CE] min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] md:h-[90vh] mt-5 flex flex-col md:flex-row overflow-hidden">
        <Background heroCount={heroCount} />
        <Hero
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={heroData[heroCount]}
        />
      </div>

      {/* Welcome Section */}
      <section className="h-24 md:h-32 mt-12 flex items-center justify-center bg-[#F4E2DC] text-3xl sm:text-4xl md:text-5xl font-bold text-center md:text-left text-[#4B2E2A] tracking-wide shadow-inner px-4 sm:px-6 md:px-12">
        Welcome to WishCart
      </section>

      {/* Product Section */}
      <section className="mt-12 px-4 sm:px-6 md:px-12">
        <Product />
      </section>

      {/* Policy Section */}
      <section className="mt-12 px-4 sm:px-6 md:px-12">
        <Policy />
      </section>

      {/* Footer Section */}
      <section className="mt-12  sm:px-0 md:px-0">
        <Footer />
      </section>
    </div>
  );
};

export default Home;
