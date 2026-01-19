import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

import { fetchProducts } from "../redux/slices/productSlice";

function TopProduct() {
  const dispatch = useDispatch();

  const [activeCategory, setActiveCategory] = useState("All");

  // ✅ READ ALL PRODUCTS FROM REDUX
  const products = useSelector(
    (state) => state.products.productsByTag.all
  );

  const loading = useSelector(
    (state) => state.products.loadingByTag.all
  );

  const categories = ["All", "Headphones", "Earphones", "Neckbands", "Earbuds"];

  const visibleProducts =
  activeCategory === "All"
    ? products.slice(0, 11)
    : products;

  /* ===================== FETCH ALL PRODUCTS ONCE ===================== */
  

  useEffect(() => {
  if (activeCategory === "All") {
    dispatch(
      fetchProducts({
        type: "all",
        filters: {}, // get ALL products
      })
    );
  } else {
    dispatch(
      fetchProducts({
        type: "all",
        filters: { category: activeCategory }, // backend filter
      })
    );
  }
}, [activeCategory, dispatch]);


  return (
    <div className="bg-[#121212] min-h-screen flex flex-col items-center pt-20 px-4">
      <h2 className="text-gray-400 text-2xl md:text-3xl font-bold">
        Top Products
      </h2>

      {/* CATEGORY BUTTONS */}
      <div className="flex gap-4 mt-8 flex-wrap justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            disabled={loading}
            className={`px-4 py-2 rounded-md ${
              activeCategory === category
                ? "bg-red-600 text-white"
                : "bg-[#121212] hover:bg-red-600 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-10 w-full max-w-7xl">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <p className="text-gray-400 text-xl animate-pulse">
              Loading products...
            </p>
          </div>
        ) : (
          <>
            {visibleProducts.map((item) => (
              <div
                key={item._id}
                className="bg-[#161819] shadow-lg border border-gray-400 rounded-md overflow-hidden"
              >
                <Link to={`/product-details/${item._id}`}>
                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="h-48 w-full object-contain mt-5 mb-2 hover:scale-105 duration-200"
                  />
                </Link>

                <div className="bg-[#121212] w-full px-4 py-6 rounded-b-md">
                  <p className="text-red-500">★★★★★</p>

                  <p className="text-gray-400 font-semibold text-lg md:text-xl mt-2">
                    {item.title}
                  </p>

                  <h6 className="text-gray-400 mt-1 text-sm">
                    {item.info}
                  </h6>

                  <hr className="border-t border-gray-700 mt-3" />

                  <div className="flex gap-2 items-center mt-3">
                    <p className="text-gray-400 font-semibold text-xl md:text-2xl">
                      ₹{item.finalPrice.toLocaleString("en-IN")}
                    </p>
                    <p className="text-gray-400 font-semibold text-lg line-through">
                      ₹{item.originalPrice.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <button
                    onClick={() => dispatch(addToCart(item))}
                    className="mt-4 bg-red-700 hover:bg-red-600 cursor-pointer text-white px-6 py-2 rounded-md font-semibold duration-200 w-full"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}

            {/* 12th CARD — BROWSE ALL */}
            {activeCategory === "All" && (
              <Link to="/products">
                <div className="bg-[#161819] border border-gray-400 flex items-center justify-center h-117">
                  <div className="flex flex-col text-gray-400 text-xl md:text-2xl hover:text-gray-200 text-center">
                    <h1>Browse All</h1>
                    <h1>Products ➜</h1>
                  </div>
                </div>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TopProduct;
