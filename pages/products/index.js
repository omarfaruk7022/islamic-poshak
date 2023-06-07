import React, { useEffect, useState } from "react";
import ProductsCard from "../../Components/Common/ProductsCard";
import ProductsComp from "@/Components/Home/ProductsComp";
import { useQuery } from "@tanstack/react-query";
import NavbarOther from "@/Components/Common/NavbarOther";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:5000/api/product");
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
};

export default function Products(products) {
  return (
    <div>
      <NavbarOther />
      <div className="grid grid-cols-1 gap-3 px-4 md:grid-cols-2 lg:grid-cols-4">
        {products?.products.data?.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
