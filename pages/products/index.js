import React, { useEffect, useState } from "react";
import ProductsCard from "../../Components/Common/ProductsCard";
import NavbarOther from "@/Components/Common/NavbarOther";
import { loadProducts } from "@/lib/load-products";
import { useQuery } from "@tanstack/react-query";

// export async function getStaticProps() {
//   const products = await loadProducts();
//   return {
//     props: {
//       products,
//     },
//   };
// }

export default function Products() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("http://localhost:5000/api/product").then((res) => res.json()),
  });
  console.log(data);

  return (
    <div>
      <NavbarOther />
      <div className="grid grid-cols-1 gap-3 px-4 md:grid-cols-2 lg:grid-cols-4">
        {data?.data.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
