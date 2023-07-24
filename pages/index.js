import Footer from "@/Components/Common/Footer";
import Banner from "@/Components/Home/Banner";
import Blog from "@/Components/Home/Blog";
import Navbar from "@/Components/Home/Navbar";
import ProductsComp from "@/Components/Home/ProductsComp";
import Head from "next/head";

export default function Home() {
  <Head>
    <title>Best Car Buying Website in This World</title>
  </Head>;
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
