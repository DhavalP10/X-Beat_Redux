import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";

const AllProducts = () => {
  const [sortBy, setSortBy] = useState("Latest");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(20000);
  const products = useSelector((state) => state.products.productsByTag.all);

  const loading = useSelector((state) => state.products.loadingByTag.all);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const searchTerm = useSelector((state) => state.search.term);
  const dispatch = useDispatch();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(
        fetchProducts({
          type: "all",
          filters: {}, 
        })
      );
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    if (!products || products.length === 0) {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter((product) => {
      const searchableText = `
      ${product.title}
      ${product.brand}
      ${product.info}
      ${product.category}
    `.toLowerCase();

      const brandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const priceMatch = product.finalPrice <= priceRange;

      const searchMatch =
        !searchTerm ||
        searchTerm
          .toLowerCase()
          .trim()
          .split(/\s+/)
          .some((word) => searchableText.includes(word));

      return brandMatch && categoryMatch && priceMatch && searchMatch;
    });

    setFilteredProducts(filtered);
  }, [products, selectedBrands, selectedCategories, priceRange, searchTerm]);

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-gray-400 flex items-center justify-center">
        Loading products...
      </div>
    );
  }

  return (
    <div className="bg-[#121212] min-h-screen pt-20 flex flex-col md:flex-row">
      {/* Filter Button for Mobile */}
      <button
        className="md:hidden bg-red-600 text-white px-4 py-2 rounded-md m-4 self-start"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        Filters
      </button>

      {/* SIDEBAR */}
      <div
        className={`w-full md:w-[280px] p-6 border-r border-gray-800 ${
          sidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        {/* SORT */}
        <h1 className="text-[#A9AFC3] font-bold text-xl">Sort By</h1>
        <hr className="border-gray-700 mt-3" />

        <ul className="text-[#A9AFC3] mt-4 space-y-2 text-sm">
          {[
            "Latest",
            "Featured",
            "Top Rated",
            "Price (Lowest First)",
            "Price (Highest First)",
          ].map((option) => (
            <li
              key={option}
              className={`cursor-pointer hover:text-red-500 ${
                sortBy === option ? "text-red-500" : ""
              }`}
              onClick={() => setSortBy(option)}
            >
              {option}
            </li>
          ))}
        </ul>

        {/* FILTER */}
        <h1 className="text-[#A9AFC3] font-bold text-xl mt-8">Filter By</h1>
        <hr className="border-gray-700 mt-3" />

        {/* BRANDS */}
        <h2 className="text-[#A9AFC3] font-semibold mt-4">Brands</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {["JBL", "boAt", "Sony"].map((brand) => (
            <li key={brand} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={brand}
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="w-4 h-4 accent-red-600"
              />
              <label htmlFor={brand} className="text-[#A9AFC3] cursor-pointer">
                {brand}
              </label>
            </li>
          ))}
        </ul>

        {/* CATEGORY */}
        <h2 className="text-[#A9AFC3] font-semibold mt-6">Category</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {["Headphones", "Earbuds", "Earphones", "Neckbands"].map((cat) => (
            <li key={cat} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={cat}
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
                className="w-4 h-4 accent-red-600"
              />
              <label htmlFor={cat} className="text-[#A9AFC3] cursor-pointer">
                {cat}
              </label>
            </li>
          ))}
        </ul>

        {/* PRICE */}
        <h2 className="text-[#A9AFC3] font-semibold mt-6">Price</h2>
        <p className="text-[#A9AFC3] mt-2">
          ₹{priceRange.toLocaleString("en-IN")}
        </p>

        <input
          type="range"
          min="449"
          max="20000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full mt-2 accent-red-600"
        />
      </div>

      {/* PRODUCTS AREA */}
      <div className="flex-1 p-4 md:p-10 text-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-[#161819] shadow-lg border border-gray-400 rounded-md overflow-hidden"
            >
              <div className="flex flex-col">
                {/* Wrap image in Link to product details */}
                <Link to={`/product-details/${product._id}`}>
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="h-48 w-full object-contain mt-4 mb-2 cursor-pointer hover:scale-105 duration-200"
                  />
                </Link>

                <div className="bg-[#121212] w-full px-4 py-6 rounded-b-md">
                  <p className="text-red-500">★★★★★</p>
                  <p className="text-gray-400 font-semibold text-lg md:text-xl mt-2">
                    {product.title}
                  </p>
                  <h6 className="text-gray-400 mt-1 text-sm">{product.info}</h6>

                  <hr className="border-t border-gray-700 mt-3" />

                  <div className="flex gap-3 items-center mt-3">
                    <p className="text-gray-400 font-semibold text-xl md:text-2xl">
                      ₹{product.finalPrice.toLocaleString("en-IN")}
                    </p>
                    <p className="text-gray-400 font-semibold text-lg line-through">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="mt-3 bg-red-700 hover:bg-red-600 text-white px-6 py-2 rounded-md font-semibold duration-200 cursor-pointer w-full"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
