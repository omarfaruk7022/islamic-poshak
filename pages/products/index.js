import React from "react";
import ProductsCard from "../../Components/Common/ProductsCard";
import { useQuery } from "@tanstack/react-query";
import NavbarOther from "@/Components/Common/NavbarOther";
import Loading from "@/Components/Common/Loading";
import { loadProducts } from "@/lib/load-products";

export default function Products(products) {
  return (
    <div>
      <NavbarOther />
      <div className="grid grid-cols-1 gap-3 px-4 md:grid-cols-2 lg:grid-cols-4">
        {products?.products?.data.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const products = await loadProducts();
  return {
    props: {
      products,
    },
  };
}
