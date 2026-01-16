import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  fetchRelatedProducts,
} from "../redux/slices/productSlice";

const ProductDetails = () => {
  const { id } = useParams(); // ✅ get product id from URL
  const [activeTab, setActiveTab] = useState("specifications");
  const [mainImage, setMainImage] = useState(null);
  const navigate = useNavigate();

  if (!id) {
    return (
      <div className="min-h-screen bg-[#121212] text-gray-400 flex items-center justify-center">
        Invalid product
      </div>
    );
  }

  const dispatch = useDispatch();

const product = useSelector(
  (state) => state.products.productDetails.item
);

const relatedProducts = useSelector(
  (state) => state.products.productDetails.related
);

const loading = useSelector(
  (state) => state.products.productDetails.loading
);




useEffect(() => {
  if (!id) return;
  dispatch(fetchProductById(id));
}, [id, dispatch]);

useEffect(() => {
  if (!product) return;

  setMainImage(product.images?.[0] || "");

  dispatch(
    fetchRelatedProducts({
      category: product.category,
      excludeId: product._id,
    })
  );
}, [product, dispatch]);


  if (loading || !product) {
    return (
      <div className="min-h-screen bg-[#121212] text-gray-400 flex items-center justify-center">
        Loading product details...
      </div>
    );
  }

  const savings = product.originalPrice - product.finalPrice;
  const discountPercent = Math.round((savings / product.originalPrice) * 100);

  return (
    <>
      {/* PRODUCT TOP SECTION */}
      <div className="min-h-screen bg-[#121212] text-white px-4 md:px-10 py-10 pt-20 md:pt-25 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* LEFT IMAGES */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="flex md:flex-col gap-4 order-2 md:order-1">
            {product.images.map((img, index) => (
              <img
              key={index}
                src={img}
                alt={product.title}
                onClick={() => setMainImage(img)}
                className="w-16 h-16 md:w-20 md:h-20 border border-gray-700 rounded-lg cursor-pointer hover:border-white"
              />
            ))}
          </div>

          <div className="flex-1 flex justify-center items-center h-[300px] md:h-[500px] order-1 md:order-2">
            <img
              src={mainImage}
              alt={product.title}
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* RIGHT DETAILS */}
        <div className="order-3">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            {product.title}
          </h1>
          <p className="text-gray-400 mb-4">{product.info}</p>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-red-500">
              {"★".repeat(product.rateCount)}
            </span>
            <span className="text-gray-400">{product.ratings} Ratings</span>
          </div>

          <hr className="border-t border-gray-700 mt-3" />

          <div className="mb-4 mt-4">
            <span className="text-2xl md:text-4xl font-bold">
              ₹{product.finalPrice.toLocaleString("en-IN")}
            </span>

            <span className="line-through text-gray-500 ml-3">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>

            <br />

            <span className="text-green-500">
              You save: ₹{savings} ({discountPercent}%)
            </span>

            <br />
            <span>(Inclusive of all taxes)</span>

            <hr className="border-t border-gray-700 mt-6" />

            <h1 className="text-gray-400 font-bold mt-5">
              Offers and Discounts
            </h1>

            <div className="text-[#A9AFC3] mt-5 flex flex-col sm:flex-row gap-4">
              <button className="border border-amber-50 px-4 py-2 rounded-[5px]">
                No Cost EMI on Credit Card
              </button>
              <button className="border border-amber-50 px-4 py-2 rounded-[5px]">
                Pay Later & Avail Cashback
              </button>
            </div>
          </div>

          {product.stock && (
            <span className="inline-block bg-green-600 px-4 py-1 rounded-full mb-6">
              In Stock
            </span>
          )}

          <button
            onClick={() => dispatch(addToCart(product))}
            className="mt-6 bg-red-600 hover:bg-red-700 px-6 md:px-10 py-3 rounded-lg text-lg w-full md:w-auto cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
      {/* TABS */}

      {/* TAB CONTENT */}
      {/* PRODUCT DETAILS SECTION */}
      <div className="bg-black w-full py-10 md:py-20">
        {/* TABS */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-10 text-sm md:text-lg px-4">
          {["specifications", "overview", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 md:px-6 py-2 rounded-md transition-all duration-300 cursor-pointer
          ${
            activeTab === tab
              ? "bg-red-600 text-white"
              : "bg-[#1a1a1a] text-gray-400 hover:text-white hover:bg-[#222]"
          }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="mt-10 bg-[#0f0f0f] rounded-xl p-4 md:p-10 max-w-5xl mx-auto shadow-lg">
          {activeTab === "specifications" && (
            <div className="space-y-4 text-sm md:text-lg">
              {/* ROW */}
              <div className="flex justify-between md:grid md:grid-cols-2 text-gray-300">
                <span>Brand</span>
                <span className="font-semibold text-white md:text-right">
                  {product.brand}
                </span>
              </div>

              <div className="flex justify-between md:grid md:grid-cols-2 text-gray-300">
                <span>Model</span>
                <span className="font-semibold text-white md:text-right">
                  {product.title}
                </span>
              </div>

              <div className="flex justify-between md:grid md:grid-cols-2 text-gray-300">
                <span>Generic Name</span>
                <span className="font-semibold text-white md:text-right">
                  {product.category}
                </span>
              </div>

              <div className="flex justify-between md:grid md:grid-cols-2 text-gray-300">
                <span>Headphone Type</span>
                <span className="font-semibold text-white md:text-right">
                  {product.type}
                </span>
              </div>

              <div className="flex justify-between md:grid md:grid-cols-2 text-gray-300">
                <span>Connectivity</span>
                <span className="font-semibold text-white md:text-right">
                  {product.connectivity}
                </span>
              </div>

              <div className="flex justify-between md:grid md:grid-cols-2 text-gray-300">
                <span>Microphone</span>
                <span className="font-semibold text-white md:text-right">
                  Yes
                </span>
              </div>
            </div>
          )}

          {activeTab === "overview" && (
            <div className="text-gray-300 space-y-4 text-sm md:text-base">
              <h1 className="text-lg md:text-xl font-semibold">
                The <span className="text-red-600">{product.title}</span>{" "}
                delivers powerful sound
              </h1>
              <p>Premium noise cancellation, deep bass and all-day comfort.</p>
              <p>
                Buy the{" "}
                <b>
                  {product.title} {product.connectivity} {product.info}
                </b>{" "}
                which offers you with fabulous music experience by providing you
                with awesome sound quality that you can never move on from.
                Enjoy perfect flexibility and mobility with amazing musical
                quality with these {product.category} giving you a truly awesome
                audio experience. It blends with exceptional sound quality and a
                range of smart features for an unrivalled listening experience.
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="bg-[#121212] rounded-lg p-4 md:p-6 flex flex-col sm:flex-row gap-4 max-w-xl">
              <div className="w-12 h-12 rounded-full bg-[#1f1f1f] flex items-center justify-center text-gray-500">
                👤
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <h4 className="text-blue-400 font-semibold">Atharva Kumar</h4>
                  <span className="text-red-500">★★★★★</span>
                  <span className="text-gray-500 text-sm">| 4 Aug 2022</span>
                </div>

                <p className="text-gray-300 mt-2">
                  Sound is awesome and as I expected, love it.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TAB CONTENT (UNCHANGED FROM YOU) */}
      {/* your existing specifications / overview / reviews code stays SAME */}

      {/* ================= RELATED PRODUCTS ================= */}
      <div className="bg-[#121212] px-4 md:px-10 py-10 md:py-20">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-8">
          Related Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/product-details/${item._id}`)}
              className="border border-gray-600 rounded-lg p-4 bg-[#181818] hover:scale-[1.02] transition cursor-pointer"
            >
              {/* IMAGE */}
              <div className="h-32 md:h-48 flex items-center justify-center">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="h-full object-contain"
                />
              </div>

              {/* RATING */}
              <div className="flex gap-1 mt-3 text-red-500">
                {"★".repeat(item.rateCount)}
              </div>

              {/* TITLE */}
              <h3 className="text-base md:text-lg font-semibold mt-2 text-white">
                {item.title}
              </h3>

              {/* INFO */}
              <p className="text-sm text-gray-400">{item.info}</p>

              <hr className="my-3 border-gray-700" />

              {/* PRICE */}
              <div className="flex items-center gap-3">
                <span className="text-lg md:text-xl font-bold text-white">
                  ₹{item.finalPrice.toLocaleString("en-IN")}
                </span>
                <span className="line-through text-gray-500">
                  ₹{item.originalPrice.toLocaleString("en-IN")}
                </span>
              </div>

              {/* BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent card click redirect
                  addToCart(item); // add this related product to cart
                }}
                className="w-full mt-4 bg-red-600 py-2 rounded hover:bg-red-700 transition text-white"
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
