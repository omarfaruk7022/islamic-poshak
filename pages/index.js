import Footer from "@/Components/Common/Footer";
import Banner from "@/Components/Home/Banner";
import HijabComp from "@/Components/Home/HijabComp";
import Navbar from "@/Components/Home/Navbar";
import ProductsComp from "@/Components/Home/ProductsComp";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <ProductsComp />
      <HijabComp />
      {/* <Blog /> */}
      <Footer />
    </div>
  );
}
