// import { useState } from 'react'
import './App.css';
import Home from './Components/Home';
import FeaturedProducts from './Components/FeaturedProducts';
import TopProducts from './pages/TopProducts';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import { Routes, Route} from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import ScrollToTop from "./Components/ScrollToTop";
import Cart from "./Components/Cart";
import Notification from "./Components/Notification";
import AllProducts from './pages/AllProducts';

function App() {

  return (
    <>
     <ScrollToTop />
    <Navbar/>
    <Notification />
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/featuredproducts' element={<FeaturedProducts/>}/>
  <Route path='/topproducts' element={<TopProducts/>}/>
  <Route path='/productdetails' element={<ProductDetails/>}/>
  <Route path="/product-details/:id" element={<ProductDetails />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/products" element={<AllProducts />} />
</Routes>
  <Footer/>
    </>
  )
}

export default App
