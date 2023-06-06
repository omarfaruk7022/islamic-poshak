import Footer from "@/Components/Common/Footer";
import Blog from "@/Components/Home/Blog";
import Navbar from "@/Components/Home/Navbar";
import Products from "@/Components/Home/Products";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Products/>
      <Blog/>
      <Footer/>
    </div>
  );
}
