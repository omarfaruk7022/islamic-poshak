import Banner from "@/Components/Home/Banner";
import Blog from "@/Components/Home/Blog";
import Navbar from "@/Components/Home/Navbar";
import ProductsComp from "@/Components/Home/ProductsComp";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <ProductsComp />
      <Blog />
    </div>
  );
}


