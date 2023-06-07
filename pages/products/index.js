import React, { useEffect, useState } from "react";
import ProductsCard from "../../Components/Common/ProductsCard";
import { useQuery } from "@tanstack/react-query";
import NavbarOther from "@/Components/Common/NavbarOther";
import Loading from "@/Components/Common/Loading";


export default function Products(props) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("http://localhost:5000/api/product").then((res) => res.json()),
    initialData: props.products,
  });
  return (
    <div>
      <NavbarOther />
      <div className="grid grid-cols-1 gap-3 px-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading && data?.data === undefined ? (
          <Loading />
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          data?.data.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
export async function getStaticProps () {
  const res = await fetch("http://localhost:5000/api/product");
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
};
