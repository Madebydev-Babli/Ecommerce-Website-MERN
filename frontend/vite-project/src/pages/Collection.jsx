import React, { useContext, useState } from "react";
import { ShopDataContext } from "../context/ShopContext";
import Card from "../components/Card";
import { FaFilter, FaTimes } from "react-icons/fa";


export default function Collection() {
  const { Products, currency, searchQuery } = useContext(ShopDataContext);

  const cats = [...new Set(Products.map((p) => p.category?.trim()).filter(Boolean))];
  if (!cats.includes("Kids")) cats.push("Kids");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const clearFilters = () => {
    setSelectedCategory("");
    setSortBy("newest");
  };

  // Filter + Sort
  let filteredProducts = Products.filter((p) => {
    const cat = p.category?.trim();
    const matchesCategory = selectedCategory ? cat === selectedCategory : true;
    const name = p.name || p.title || "";
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (sortBy === "newest") {
    filteredProducts = [...filteredProducts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortBy === "lowToHigh") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "highToLow") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <>
        <title>All Collections | Wishcart</title>
        <meta
          name="description"
          content="Discover all categories in our clothing collection – from men and women to kids. Shop trendy styles at the best prices."
        />
        <link rel="canonical" href="https://yourdomain.com/collections" />

      <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-[#DCC7B8] via-[#D6B2A4] to-[#C19A8B]">
        
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:block w-64 p-6 border-r border-[#E2C4B3]/60 bg-[#F8EFEA] rounded-r-3xl sticky top-0 h-screen overflow-y-auto">
          <header className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-[#3B2F2F]">Filters</h2>
            <button onClick={clearFilters} className="text-sm text-indigo-600 hover:underline" aria-label="Clear filters">
              Clear
            </button>
          </header>

          <section className="mb-6">
            <h3 className="text-sm font-medium text-[#5A4A3F] mb-2">Categories</h3>
            <div className="space-y-2">
              <button
                className={`block w-full text-left px-3 py-2 rounded-xl transition ${
                  selectedCategory === ""
                    ? "bg-[#3B2F2F] text-white"
                    : "hover:bg-[#E2C4B3]/50 text-[#3B2F2F]"
                }`}
                onClick={() => setSelectedCategory("")}
              >
                All
              </button>
              {cats.map((cat) => (
                <button
                  key={cat}
                  className={`block w-full text-left px-3 py-2 rounded-xl transition ${
                    selectedCategory === cat
                      ? "bg-[#3B2F2F] text-white"
                      : "hover:bg-[#E2C4B3]/50 text-[#3B2F2F]"
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>
        </aside>

        {/* Mobile Filter Drawer */}
        {showFilters && (
          <div className="fixed inset-0 z-50 flex">
            <div className="w-64 p-6 bg-[#F8EFEA] rounded-r-3xl shadow-xl border-r border-[#E2C4B3]/60">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-[#3B2F2F]">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-[#3B2F2F] hover:text-[#A6715A]"
                  aria-label="Close filters"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-[#5A4A3F] mb-2">Categories</h3>
                <div className="space-y-2">
                  <button
                    className={`block w-full text-left px-3 py-2 rounded-xl transition ${
                      selectedCategory === ""
                        ? "bg-[#3B2F2F] text-white"
                        : "hover:bg-[#E2C4B3]/50 text-[#3B2F2F]"
                    }`}
                    onClick={() => {
                      setSelectedCategory("");
                      setShowFilters(false);
                    }}
                  >
                    All
                  </button>
                  {cats.map((cat) => (
                    <button
                      key={cat}
                      className={`block w-full text-left px-3 py-2 rounded-xl transition ${
                        selectedCategory === cat
                          ? "bg-[#3B2F2F] text-white"
                          : "hover:bg-[#E2C4B3]/50 text-[#3B2F2F]"
                      }`}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowFilters(false);
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  clearFilters();
                  setShowFilters(false);
                }}
                className="w-full mt-4 py-2 bg-[#E2C4B3]/60 rounded-xl hover:bg-[#C19A8B] text-[#3B2F2F] font-semibold"
              >
                Clear Filters
              </button>
            </div>

            <div className="flex-1 bg-black/40" onClick={() => setShowFilters(false)} />
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <header className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#3B2F2F]">All Collections</h1>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(true)}
                className="md:hidden flex items-center gap-2 px-3 py-2 border rounded-xl text-[#3B2F2F] bg-[#F8EFEA] shadow-sm hover:bg-[#E2C4B3]/50 transition"
                aria-label="Open filters"
              >
                <FaFilter /> Filters
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-xl text-[#3B2F2F] bg-[#F8EFEA] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E2C4B3]"
                aria-label="Sort products"
              >
                <option value="newest">Sort by: Newest</option>
                <option value="lowToHigh">Sort by: Price (Low → High)</option>
                <option value="highToLow">Sort by: Price (High → Low)</option>
              </select>
            </div>
          </header>

          <section>
            {filteredProducts.length === 0 ? (
              <p className="text-[#5A4A3F]">No products found.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
                {filteredProducts.map((product) => (
                  <Card key={product._id} product={product} currency={currency} />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
