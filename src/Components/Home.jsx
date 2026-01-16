import HeroSlider from "./HeroSlider";
import TopProducts from "../pages/TopProducts";
import FeaturedProducts from "./FeaturedProducts";
// import ProductDetails from "../pages/ProductDetails";


function Home() {
  return (
    <div className="bg-[#121212] min-h-screen text-gray-300">
      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>


      <HeroSlider />
      <FeaturedProducts />
      <TopProducts />
    </div>
  );
}

export default Home;
