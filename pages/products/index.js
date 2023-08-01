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
      fetch("http://localhost:5000/api/product").then((res) => res.json()),
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <>
        <NavbarOther />
        <h4 className="text-3xl text-center pt-10">All Products</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:px-36 px-0">
          {data?.data.map((product) => (
            <ProductsCard key={product._id} product={product} />
          ))}
        </div>
      </>
      <Footer />
    </div>
  );
}
