import React, { useEffect, useState } from "react";
import ProductsCard from "../../Components/Common/ProductsCard";
import { loadProducts } from "@/lib/load-products";
import { useQuery } from "@tanstack/react-query";
import NavbarOther from "@/Components/Common/NavbarOther";
import auth from "@/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "@/Components/Common/Loading";
import { useRouter } from "next/router";

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
      fetch("https://bmw-server.onrender.com/api/product").then((res) =>
        res.json()
      ),
  });

  if (loading) {
    return <Loading />;
  }
  if (!user) {
    router.push("/login");
  }

  return (
    <div>
      {user ? (
        <>
          <NavbarOther />
          <div className="grid grid-cols-1 gap-3 px-4 md:grid-cols-2 lg:grid-cols-4  ">
            {data?.data.map((product) => (
              <ProductsCard key={product._id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
