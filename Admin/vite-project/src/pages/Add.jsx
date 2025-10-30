import React, { useContext, useState, memo } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import "../index.css"; // 🪄 for animation keyframes

function Add() {
  const { serverUrl } = useContext(AuthDataContext);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    price: "",
    size: [],
    bestSeller: false,
    images: { image1: null, image2: null, image3: null, image4: null },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        images: { ...prev.images, [key]: file },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        name,
        description,
        category,
        subCategory,
        price,
        size,
        bestSeller,
        images,
      } = formData;

      let formDataToSend = new FormData();
      formDataToSend.append("name", name);
      formDataToSend.append("description", description);
      formDataToSend.append("category", category);
      formDataToSend.append("subCategory", subCategory);
      formDataToSend.append("price", price);
      formDataToSend.append("sizes", JSON.stringify(size));
      formDataToSend.append("bestSeller", bestSeller);
      formDataToSend.append("image1", images.image1);
      formDataToSend.append("image2", images.image2);
      formDataToSend.append("image3", images.image3);
      formDataToSend.append("image4", images.image4);

      const result = await axios.post(
        `${serverUrl}/api/product/addproduct`,
        formDataToSend,
        { withCredentials: true }
      );

      if (result.data.success) {
        toast.success("Product added successfully!");
        setFormData({
          name: "",
          description: "",
          category: "",
          subCategory: "",
          price: "",
          size: [],
          bestSeller: false,
          images: { image1: null, image2: null, image3: null, image4: null },
        });
      } else {
        toast.error("⚠ Failed to add product. Try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-[#f1e1df] via-[#f4d8d2] to-[#fff] text-gray-900 overflow-x-hidden flex">
      {/* Sidebar */}
      <div className="hidden lg:block w-[17%] fixed top-0 left-0 h-full bg-[#f6e4e1] border-r border-[#d3a6a0] shadow-md animate-slideInLeft z-30">
        <Sidebar />
      </div>

      {/* Mobile Sidebar (Drawer button) */}
      <div className="block lg:hidden fixed top-0 left-0 z-40">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-[17%] w-full animate-fadeIn">
        <Nav />

        {/* Form Section */}
        <div className="flex justify-center px-2 py-6 sm:py-10 sm:px-6 lg:px-10 mt-[100px]">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg sm:max-w-2xl bg-white rounded-3xl shadow-2xl p-5 sm:p-8 space-y-6 border border-[#e2c5c0] animate-slideUp transition-all duration-500"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[#6b302c] drop-shadow-sm">
              Add New Product
            </h2>

            {/* Product Name */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full rounded-lg border border-[#d3a6a0] bg-[#fff8f7] px-4 py-3 transition-all duration-300 focus:border-[#a14236] focus:ring-4 focus:ring-[#f2b7ae]/50 shadow-sm hover:shadow-md text-sm"
              required
            />

            {/* Category + Subcategory */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="rounded-lg border border-[#d3a6a0] bg-[#fff8f7] px-4 py-3 focus:border-[#a14236] focus:ring-4 focus:ring-[#f2b7ae]/50 shadow-sm hover:shadow-md transition-all text-sm"
                required
              >
                <option value="">Select Category</option>
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Kids">Kids</option>
                <option value="Women-Men">Women-Men</option>
              </select>

              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                className="rounded-lg border border-[#d3a6a0] bg-[#fff8f7] px-4 py-3 focus:border-[#a14236] focus:ring-4 focus:ring-[#f2b7ae]/50 shadow-sm hover:shadow-md transition-all text-sm"
              >
                <option value="">Select Subcategory</option>
                <option value="Top-wear">Top-wear</option>
                <option value="Bottom-wear">Bottom-wear</option>
                <option value="One-piece">One-piece</option>
                <option value="Both">Both</option>
              </select>
            </div>

            {/* Price + Sizes */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-4">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full sm:w-[40%] h-[48px] rounded-lg border border-[#d3a6a0] bg-[#fff8f7] px-4 py-[10px] focus:border-[#a14236] focus:ring-4 focus:ring-[#f2b7ae]/50 shadow-sm hover:shadow-md transition-all text-sm"
                required
              />

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {["XS", "S", "M", "L", "XL", "XXL", "18", "20", "22", "24", "26", "28", "30", "32", "One-Size-Fits-All"].map(
                  (sizeOption) => (
                    <label
                      key={sizeOption}
                      className="flex items-center gap-2 rounded-lg border border-[#e2c5c0] bg-[#fff8f7] px-3 py-2 cursor-pointer hover:border-[#a14236] hover:shadow-md transition"
                    >
                      <input
                        type="checkbox"
                        value={sizeOption}
                        checked={formData.size.includes(sizeOption)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, size: [...formData.size, sizeOption] });
                          } else {
                            setFormData({ ...formData, size: formData.size.filter((s) => s !== sizeOption) });
                          }
                        }}
                        className="accent-[#a14236]"
                      />
                      {sizeOption}
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Bestseller */}
            <label className="flex items-center gap-3 cursor-pointer hover:scale-[1.02] transition-transform">
              <input
                type="checkbox"
                name="bestSeller"
                checked={formData.bestSeller}
                onChange={handleChange}
                className="accent-[#a14236] w-5 h-5"
              />
              <span className="font-semibold text-[#6b302c]">Mark as Bestseller</span>
            </label>

            {/* Description */}
            <div className="w-full flex flex-col items-center">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Product Description"
                rows="5"
                className="w-full max-w-2xl sm:max-w-3xl rounded-lg border border-[#d3a6a0] bg-[#fff8f7] px-4 py-3 text-sm focus:border-[#a14236] focus:ring-4 focus:ring-[#f2b7ae]/50 shadow-sm hover:shadow-md transition-all resize-y"
                required
              ></textarea>
            </div>



            {/* Images */}
            <div className="grid grid-cols-2 gap-4">
              {["image1", "image2", "image3", "image4"].map((imgKey, index) => (
                <div key={imgKey} className="transition-transform hover:scale-[1.02]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, imgKey)}
                    className="block w-full text-sm text-[#6b302c] file:mr-4 file:rounded-lg file:border-0 file:bg-[#a14236] file:px-4 file:py-2 file:text-white hover:file:bg-[#812f28] cursor-pointer"
                  />
                  {formData.images[imgKey] && (
                    <img
                      src={URL.createObjectURL(formData.images[imgKey])}
                      alt={`Preview ${index + 1}`}
                      className="mt-2 h-28 rounded-lg object-contain border border-[#e2c5c0] shadow-sm"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full flex justify-center items-center gap-2 rounded-lg bg-[#a14236] text-white px-6 py-3 font-semibold shadow-lg transition-all duration-300 hover:bg-[#812f28] hover:shadow-xl active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Adding Product...
                </>
              ) : (
                <>➕ Add Product</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default memo(Add)
