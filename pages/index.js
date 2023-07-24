import Footer from "@/Components/Common/Footer";
import Banner from "@/Components/Home/Banner";
import Blog from "@/Components/Home/Blog";
import Navbar from "@/Components/Home/Navbar";
import ProductsComp from "@/Components/Home/ProductsComp";
import Head from "next/head";

export default function Home() {

  return (
    <div>
      <Navbar />
      <Banner />
      <ProductsComp />
      <Blog />
      <Footer />
    </div>
  );
}
