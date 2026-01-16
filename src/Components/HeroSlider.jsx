import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../redux/slices/productSlice";

function HeroSlider() {
  const dispatch = useDispatch();

  // 🔹 READ hero products from Redux
  const slides = useSelector(
    (state) => state.products.productsByTag.hero
  );

 const loading = useSelector(
  (state) => state.products.loadingByTag.hero
);


  // 🔹 LOCAL UI STATE (slider logic)
  const [current, setCurrent] = useState(0);

  // 🔹 FETCH HERO PRODUCTS (ONCE)
  useEffect(() => {
    if(slides.length === 0){
      dispatch(fetchProducts({
        type: "hero",
        filters: {tag: "hero-product"},
      }));
    }
  }, [dispatch, slides.length]);

  // 🔹 AUTO SLIDE LOGIC (UI ONLY)
  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  /* ===================== LOADER ===================== */
  if (loading) {
    return (
      <div className="relative w-full h-screen bg-[#121212] flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
          <div className="order-1 md:order-2 flex justify-center items-center">
            <div className="w-[240px] h-[240px] md:w-[380px] md:h-[380px] bg-gray-700 rounded-xl"></div>
          </div>

          <div className="order-2 md:order-1 flex flex-col justify-center space-y-6">
            <div className="h-4 w-32 bg-gray-700 rounded"></div>
            <div className="h-10 w-3/4 bg-gray-700 rounded"></div>
            <div className="h-10 w-2/3 bg-gray-700 rounded"></div>
            <div className="h-12 w-40 bg-red-700/40 rounded mt-6"></div>
          </div>
        </div>
      </div>
    );
  }

  /* ===================== SLIDER ===================== */
  return (
    <div className="relative overflow-hidden w-full h-screen bg-[#121212] px-20">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((item) => (
          <div
            key={item._id}
            className="min-w-full h-screen flex flex-col md:flex-row items-center px-6 md:px-12 lg:px-20 relative text-gray-300"
          >
            {/* Background Text */}
            <h1 className="hidden md:block absolute left-10 top-1/2 -translate-y-1/2 text-[140px] font-bold text-[#1a1a1a] select-none">
              {item.type}
            </h1>

            {/* Image */}
            <div className="order-1 md:order-2 mt-10 md:mt-0 md:ml-auto z-10">
              <img
                src={item.heroImage}
                alt={item.title}
                className="w-64 md:w-80 lg:w-120 object-contain"
              />
            </div>

            {/* Text */}
            <div className="order-2 md:order-1 z-10 max-w-lg text-center md:text-left">
              <p className="text-gray-400">{item.title}</p>

              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-200 mt-3">
                {item.tagline}
              </h1>

              <div className="flex justify-center md:justify-start gap-4 mt-6">
                <p className="text-2xl font-bold text-white">
                  ₹{item.finalPrice.toLocaleString("en-IN")}
                </p>
                <p className="text-xl line-through text-gray-500">
                  ₹{item.originalPrice.toLocaleString("en-IN")}
                </p>
              </div>

              <Link
                to={`/product-details/${item._id}`}
                className="inline-block mt-8 bg-red-700 hover:bg-red-600 text-white px-8 py-3 rounded-md text-lg font-semibold transition"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index ? "bg-red-500" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;
