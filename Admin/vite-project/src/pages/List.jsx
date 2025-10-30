import React, { useContext, useEffect, useState, memo } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext";

function List() {
  const { serverUrl } = useContext(AuthDataContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletePopup, setDeletePopup] = useState({ show: false, product: null });

  const fetchProducts = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/product/list`, {
        withCredentials: true,
      });
      setProducts(result.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (product) => {
    setDeletePopup({ show: true, product });
  };

  const removeProducts = async (id) => {
    try {
      await axios.post(
        `${serverUrl}/api/product/remove/${id}`,
        {},
        { withCredentials: true }
      );
      fetchProducts();
    } catch (error) {
      console.log(error);
    } finally {
      setDeletePopup({ show: false, product: null });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-screen min-h-screen flex bg-gradient-to-br from-[#f1e1df] via-[#f4d8d2] to-[#fff] text-gray-800 overflow-x-hidden">
      {/* Sidebar */}
      <div className="hidden lg:block w-[17%] fixed top-0 left-0 h-full bg-[#f6e4e1] border-r border-[#d3a6a0] shadow-md z-20">
        <Sidebar />
      </div>
      <div className="block lg:hidden fixed top-0 left-0 z-30">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-[17%] w-full">
        <Nav />

        <div className="p-4 sm:p-8 mt-[90px] animate-fadeIn">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-[#6b302c] tracking-wide text-center">
            All Products
          </h2>

          {/* Loader */}
          {loading ? (
            <div className="flex justify-center items-center h-[60vh]">
              <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-[#6b302c]"></div>
            </div>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">No products found.</p>
          ) : (
            <>
              {/* Desktop/tablet table */}
              <div className="hidden sm:block overflow-x-auto rounded-2xl shadow-2xl border border-[#e4c7c2] bg-white backdrop-blur-sm transition-all duration-300 hover:shadow-[#cfa9a2]/50">
                <table className="min-w-full border-collapse text-[15px]">
                  <thead className="bg-[#e8c5bf] text-[#3e1e1a] text-base">
                    <tr>
                      <th className="p-4 text-left">Image</th>
                      <th className="p-4 text-left">Name</th>
                      <th className="p-4 text-left">Category</th>
                      <th className="p-4 text-left">Price</th>
                      <th className="p-4 text-left">Sizes</th>
                      <th className="p-4 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => {
                      const optimizedImage = product.image1?.includes("/upload/")
                        ? product.image1.replace("/upload/", "/upload/f_auto,q_auto,w_200/")
                        : product.image1;
                      return (
                        <tr
                          key={product._id}
                          className={`border-b border-[#e8d3cf] hover:bg-[#fff5f4] transition-all duration-300 ${
                            index % 2 === 0 ? "bg-[#fff]" : "bg-[#fdf5f4]"
                          }`}
                        >
                          <td className="p-4">
                            <div className="relative w-20 h-20 bg-[#f4e1db] flex items-center justify-center rounded-xl overflow-hidden">
                              <div className="absolute inset-0 animate-pulse bg-[#e5c7ba]" />
                              <img
                                src={optimizedImage}
                                alt={product.name}
                                loading="lazy"
                                onLoad={(e) => e.target.previousSibling.remove()}
                                className="h-20 w-20 object-contain rounded-xl border border-[#e0c1bb] shadow-sm hover:scale-105 transition-transform"
                              />
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-[#4b1f1c]">
                            {product.name}
                          </td>
                          <td className="p-4">{product.category}</td>
                          <td className="p-4 font-medium text-[#812f28]">
                            ₹{product.price}
                          </td>
                          <td className="p-4">
                            {Array.isArray(product.sizes)
                              ? product.sizes.join(", ")
                              : ""}
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => confirmDelete(product)}
                              className="bg-[#a14236] text-white px-4 py-2 rounded-lg hover:bg-[#812f28] shadow-md transition-transform hover:scale-105"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile card view */}
              <div className="block sm:hidden w-full space-y-5">
                {products.map((product, index) => {
                  const optimizedImage = product.image1?.includes("/upload/")
                    ? product.image1.replace("/upload/", "/upload/f_auto,q_auto,w_200/")
                    : product.image1;
                  return (
                    <div
                      key={product._id}
                      className="bg-white border border-[#e4c7c2] rounded-2xl shadow-md p-4 flex flex-col gap-2 animate-fadeIn"
                    >
                      <div className="flex gap-3 items-center">
                        <div className="relative w-16 h-16 bg-[#f4e1db] flex items-center justify-center rounded-xl overflow-hidden">
                          <div className="absolute inset-0 animate-pulse bg-[#e5c7ba]" />
                          <img
                            src={optimizedImage}
                            alt={product.name}
                            loading="lazy"
                            onLoad={(e) => e.target.previousSibling.remove()}
                            className="h-16 w-16 object-contain rounded-xl border border-[#e0c1bb] shadow-sm"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-[#4b1f1c]">{product.name}</div>
                          <div className="text-xs text-[#812f28] font-medium">₹{product.price}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-x-3">
                        <div className="text-xs">{product.category}</div>
                        <div className="text-xs">Sizes: {Array.isArray(product.sizes) ? product.sizes.join(", ") : ""}</div>
                      </div>
                      <button
                        onClick={() => confirmDelete(product)}
                        className="w-full bg-[#a14236] text-white px-3 py-2 rounded-lg hover:bg-[#812f28] shadow-md transition-transform hover:scale-105 mt-2"
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {deletePopup.show && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white p-8 rounded-2xl shadow-2xl border border-[#e2c5c0] w-[90%] max-w-md text-center transform scale-100 animate-popIn">
            <h3 className="text-2xl font-bold text-[#6b302c] mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#812f28]">
                {deletePopup.product?.name}
              </span>
              ?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeletePopup({ show: false, product: null })}
                className="px-6 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => removeProducts(deletePopup.product._id)}
                className="px-6 py-2 rounded-lg bg-[#a14236] text-white hover:bg-[#812f28] transition shadow-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
   </div>
  );
}

export default memo(List);
