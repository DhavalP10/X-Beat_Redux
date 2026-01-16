import { FaTruckFast } from "react-icons/fa6";
import { IoShieldHalf } from "react-icons/io5";
import { IoIosPricetags } from "react-icons/io";
import { FaCreditCard } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
function Footer() {

  return (
    <>
    <div className="bg-[#121212] py-10 md:py-20">
        <h1 className=" text-gray-400 font-bold text-center pt-10 md:pt-24 text-2xl md:text-3xl">Our Advantages</h1>
        <div className="flex flex-col md:flex-row justify-around mt-10 md:mt-20 px-4">
        <div className="flex items-center gap-3 mb-6 md:mb-0">
        <span>
          <FaTruckFast className="text-red-500 text-2xl md:text-3xl"/>
        </span>
        <span>
          <h1 className="text-gray-400 text-lg md:text-2xl">Express Delivery</h1>
          <h3 className="text-gray-400 text-sm md:text-base">Ships in 24 Hours</h3>
        </span>
        </div>
        <div className="flex items-center gap-3 mb-6 md:mb-0">
        <span>
          <IoShieldHalf className="text-red-500 text-2xl md:text-3xl"/>
        </span>
        <span>
          <h1 className="text-gray-400 text-lg md:text-2xl">Brand Warranty</h1>
          <h3 className="text-gray-400 text-sm md:text-base">100% Original products</h3>
        </span>
        </div>
        <div className="flex items-center gap-3 mb-6 md:mb-0">
        <span>
          <IoIosPricetags className="text-red-500 text-xl md:text-2xl transform -rotate-12"/>
        </span>
        <span>
          <h1 className="text-gray-400 text-lg md:text-2xl">Exciting Deals</h1>
          <h3 className="text-gray-400 text-sm md:text-base">On all prepaid orders</h3>
        </span>
        </div>
        <div className="flex items-center gap-3">
        <span>
          <FaCreditCard className="text-red-500 text-xl md:text-2xl"/>
        </span>
        <span>
          <h1 className="text-gray-400 text-lg md:text-2xl">Secure Payments</h1>
          <h3 className="text-gray-400 text-sm md:text-base">SSL / Secure certificate</h3>
        </span>
        </div>
      </div>
      </div>
      <footer>
      <div className="bg-black grid grid-cols-1 md:grid-cols-4 gap-8 px-8 md:px-15 py-20 lg:pl-30">
  <div>
    <h1 className="text-gray-400 text-xl md:text-2xl font-bold">X-Beat</h1>
    <p className="text-gray-400 mt-4 text-sm md:text-base">
      Subscribe to our Email alerts to receive <br /> early discount offers, and new products info.
    </p>
    <input
      type="text"
      placeholder="Email Address*"
      className="mt-3 w-full md:w-auto pr-4 md:pr-20 py-2 text-gray-400 border pl-5"
    />
    <br />
    <button className="w-full md:w-40 mt-3 bg-red-700 hover:bg-red-600 cursor-pointer text-white py-2 rounded-lg font-medium transition">
      Subscribe
    </button>
  </div>

  <div>
    <h4 className="text-[#A9AFC3] font-bold text-lg md:text-2xl text-center">Help</h4>
    <ul className="mt-4 text-gray-400 text-sm md:text-base text-center list-none">
      <li className="mt-2 cursor-pointer hover:text-white">FAQs</li>
      <li className="mt-2 cursor-pointer hover:text-white">Track Order</li>
      <li className="mt-2 cursor-pointer hover:text-white">Cancel Order</li>
      <li className="mt-2 cursor-pointer hover:text-white">Return Order</li>
      <li className="mt-2 cursor-pointer hover:text-white">Warranty Info</li>
    </ul>
  </div>

  <div>
    <h4 className="text-[#A9AFC3] font-bold text-lg md:text-2xl text-center">Policies</h4>
    <ul className="mt-4 text-gray-400 text-sm md:text-base text-center list-none">
      <li className="mt-2 cursor-pointer hover:text-white">Return Policy</li>
      <li className="mt-2 cursor-pointer hover:text-white">Security</li>
      <li className="mt-2 cursor-pointer hover:text-white">Sitemap</li>
      <li className="mt-2 cursor-pointer hover:text-white">Privacy Policy</li>
      <li className="mt-2 cursor-pointer hover:text-white">Terms & Conditions</li>
    </ul>
  </div>

  <div>
    <h4 className="text-[#A9AFC3] font-bold text-lg md:text-2xl text-center">Company</h4>
    <ul className="mt-4 text-gray-400 text-sm md:text-base text-center list-none">
      <li className="mt-2 cursor-pointer hover:text-white">About Us</li>
      <li className="mt-2 cursor-pointer hover:text-white">Contact Us</li>
      <li className="mt-2 cursor-pointer hover:text-white">Service Centres</li>
      <li className="mt-2 cursor-pointer hover:text-white">Careers</li>
      <li className="mt-2 cursor-pointer hover:text-white">Affiliates</li>
    </ul>
  </div>
</div>
      <div className="flex flex-col md:flex-row justify-between items-center bg-black text-gray-500 px-4 md:px-10 py-4">
      <span className="text-center md:text-left mb-4 md:mb-0">
  <h1>2025 | XBeat. All Rights Reserved. Built by | <b>Gulshan Songara</b></h1>
      </span>
      <span className="flex gap-4 text-xl md:text-2xl">
        <FaFacebookF className="hover:text-amber-50 cursor-pointer"/>
        <FaTwitter className="hover:text-amber-50 cursor-pointer"/>
        <FaInstagramSquare className="hover:text-amber-50 cursor-pointer"/>
        <FaLinkedin className="hover:text-amber-50 cursor-pointer"/>
      </span>
      </div>
      </footer>
    </>
  )
}

export default Footer