import React, { useEffect, useState } from "react";
import ProductsCard from "../../Components/Common/ProductsCard";
import { loadProducts } from "@/lib/load-products";
import { useQuery } from "@tanstack/react-query";
import NavbarOther from "@/Components/Common/NavbarOther";
import auth from "@/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "@/Components/Common/Loading";
import { useRouter } from "next/router";
import Footer from "@/Components/Common/Footer";
import Navbar from "@/Components/Home/Navbar";

// export async function getStaticProps() {
//   const products = await loadProducts();
//   return {
//     props: {
//       products,
//     },
//   };
// }

export default function Products() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://frantic-crab-cape.cyclic.app/api/product").then((res) =>
        res.json()
      ),
  });

  console.log(data);
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <>
        <Navbar />
        <h4 className="text-3xl text-center pt-10">আমাদের সকল প্রোডাক্টস</h4>
        <div className="flex flex-wrap lg:px-36 px-0 gap-3 justify-center lg:justify-normal">
          {data?.data.map((product) => (
            <ProductsCard key={product._id} product={product} />
          ))}
        </div>
      </>
      <Footer />
    </div>
  );
}
