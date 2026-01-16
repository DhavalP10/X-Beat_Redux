// import { useContext } from "react";
// import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";
import { TbTrash, TbMinus, TbPlus } from "react-icons/tb";
import { BsCartX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/slices/cartSlice";

const Cart = () => {

  

const cartItems = useSelector(
  (state) => state.cart.items
);

const dispatch = useDispatch();

  const totalAmount = cartItems.reduce((total, item) => total + (item.finalPrice * item.quantity), 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (cartItems.length === 0)
    return (
      <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center text-center">
        <div className="relative mb-6 pt-10">
          <BsCartX className="text-red-600 text-[120px]" />
        </div>
        <h2 className="text-gray-300 text-2xl font-semibold mb-6">
          Your Cart is Empty
        </h2>
        <Link to="/products">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md text-lg font-semibold transition-colors">
            Start Shopping
          </button>
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 py-10 text-center md:text-left">Your Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-[#1a1a1a] rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Product Image */}
                  <div className="shrink-0">
                    <img 
                      src={item.images?.[0]} 
                      alt={item.title} 
                      className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-lg" 
                    />
                  </div>

                  {/* Product Details */}
                  <div className="grow">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-semibold text-gray-100">{item.title}</h2>
                      <button
                        onClick={() => dispatch(removeFromCart(item._id))}
                        className="text-red-500 hover:text-red-400 transition-colors p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <TbTrash size={20} />
                      </button>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4">{item.info}</p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 text-sm">Quantity:</span>
                        <div className="flex items-center bg-[#2a2a2a] rounded-lg">
                          <button
                            onClick={() => dispatch(decreaseQuantity(item._id))}
                            className="p-2 text-gray-400 hover:text-white hover:bg-[#3a3a3a] rounded-l-lg transition-colors cursor-pointer"
                            disabled={item.quantity <= 1}
                          >
                            <TbMinus size={16} />
                          </button>
                          <span className="px-4 py-2 text-center min-w-12">{item.quantity}</span>
                          <button
                            onClick={() => dispatch(increaseQuantity(item._id))}
                            className="p-2 text-gray-400 hover:text-white hover:bg-[#3a3a3a] rounded-r-lg transition-colors cursor-pointer"
                          >
                            <TbPlus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-500">
                          ₹{(item.finalPrice * item.quantity).toLocaleString("en-IN")}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-400">
                            ₹{item.finalPrice.toLocaleString("en-IN")} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1a1a] rounded-lg p-6 shadow-lg sticky top-6">
              <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Items:</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal:</span>
                  <span className="font-semibold">₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping:</span>
                  <span className="text-green-500">Free</span>
                </div>
                <hr className="border-gray-700" />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-red-500">₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors mb-4 cursor-pointer">
                Proceed to Checkout
              </button>
              
              <Link to="/products" className="block text-center">
                <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors cursor-pointer">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;