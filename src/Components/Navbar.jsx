import { useState, useRef, useEffect, useContext } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchTerm, clearSearchTerm } from "../redux/slices/searchSlice";
import Login from "./Login";
import Signup from "./Signup";
// import productsData from "../data/products";
// import productapi from "../productapi";
import { ProductContext } from "../context/ProductContext";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
const searchTerm = useSelector((state) => state.search.term);
const dispatch = useDispatch();


  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [showSearch, setShowSearch] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();
  // const { products } = useContext(ProductContext);

  const { fetchProducts } = useContext(ProductContext);

useEffect(() => {
  if (!searchTerm.trim()) {
    setSearchResults([]);
    return;
  }

  const timeoutId = setTimeout(async () => {
    try {
      const data = await fetchProducts({ search: searchTerm });
      setSearchResults(data || []);
    } catch (err) {
      console.error("Search failed", err);
    }
  }, 400); // 👈 debounce delay

  return () => clearTimeout(timeoutId);
}, [searchTerm]);


  // CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showSearch && searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
      if (profileOpen && profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch, profileOpen]);

  return (
    <nav className="w-full bg-[#121212] text-gray-300 px-4 md:px-20 py-4 fixed top-0 left-0 flex items-center justify-between z-[70]">

      {/* LOGO */}
      <Link to="/">
        <h1 className="text-lg md:text-xl font-bold tracking-wide text-white">
          X-Beat
        </h1>
      </Link>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 md:gap-15">


<div className="relative flex items-center" ref={searchRef}>
  {/* SEARCH ICON */}
  <FaSearch
    className="text-xl cursor-pointer hover:text-white"
    onClick={() => setShowSearch((prev) => !prev)}
  />

  {/* SEARCH INPUT (FIXED ON MOBILE, ABSOLUTE ON DESKTOP) */}
  <div
    className={`
      transition-all duration-300
      ${
        showSearch
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      }

      /* MOBILE */
      fixed left-1/2 -translate-x-1/2 top-16 z-[60]

      /* DESKTOP */
      md:absolute md:left-auto md:translate-x-0 md:right-8 md:top-1/2 md:-translate-y-1/2
    `}
  >
   <input
  type="text"
  placeholder="Search..."
  value={searchTerm}
  onChange={(e) => {
    dispatch(setSearchTerm(e.target.value));
    navigate("/products");
  }}
  className="w-[90vw] sm:w-72 bg-[#1e1e1e] text-white border border-red-600 rounded-md px-4 py-2 outline-none"
/>


    {/* SEARCH RESULTS */}
    {searchTerm && searchResults.length > 0 && (
      <div className="absolute left-0 mt-2 w-full bg-[#1a1a1a] border border-gray-700 rounded-md shadow-lg max-h-64 overflow-y-auto">
        {searchResults.map((product) => (
          <div
            key={product._id}
            className="flex items-center gap-3 px-3 py-2 hover:bg-[#2a2a2a] cursor-pointer"
            onClick={() => {
  navigate(`/product-details/${product._id}`);
  setShowSearch(false);
  dispatch(clearSearchTerm());
}}

          >
            <img
              src={product.images[0]} 
              alt={product.title}
              className="w-10 h-10 object-contain"
            />
            <div className="flex-1">
              <p className="text-sm text-white">{product.title}</p>
            </div>
            <p className="text-red-500 text-sm font-semibold">
              ₹{product.finalPrice}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
</div>



        {/* CART */}
        <Link to="/cart" className="relative">
          <FaShoppingCart className="text-2xl hover:text-white" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

        {/* PROFILE */}
        <div ref={profileRef} className="relative">
          <IoPersonCircle
            className="text-2xl cursor-pointer hover:text-white"
            onClick={() => setProfileOpen(!profileOpen)}
          />

          {profileOpen && (
            <div className="absolute right-0 mt-4 w-72 bg-[#121212] border border-gray-700 rounded-lg p-4 shadow-lg">
              <h2 className="text-lg font-semibold text-white">Hello!</h2>
              <p className="text-sm text-gray-400 mb-4">
                Access account and manage orders
              </p>

              <div className="flex justify-evenly mb-4">
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setProfileOpen(false);
                  }}
                  className="w-20 border border-gray-500 py-2 rounded hover:bg-gray-800"
                >
                  Login
                </button>

                <button
                  onClick={() => {
                    setShowSignupModal(true);
                    setProfileOpen(false);
                  }}
                  className="w-20 border border-gray-500 py-2 rounded hover:bg-gray-800"
                >
                  Signup
                </button>
              </div>

              <ul className="space-y-2 text-sm">
                <li className="hover:text-white cursor-pointer">Orders</li>
                <li className="hover:text-white cursor-pointer">Wishlist</li>
                <li className="hover:text-white cursor-pointer">Saved Cards</li>
                <li className="hover:text-white cursor-pointer">Saved Addresses</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
      <Login
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignup={() => setShowSignupModal(true)}
      />

      <Signup
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={() => setShowLoginModal(true)}
      />
    </nav>
  );
};

export default Navbar;