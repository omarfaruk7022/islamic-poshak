import React, { useEffect, useState } from "react";
import ProductsCard from "../Common/ProductsCard";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Common/Loading";

export default function ProductsComp() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://easy-plum-caridea-tie.cyclic.app/api/product").then(
        (res) => res.json()
      ),
  });
  return (
    <>
      <h4 className="text-3xl text-center pt-10">All Products</h4>

      <div className="grid grid-cols-1 gap-3  md:grid-cols-3 lg:grid-cols-6 px-0 lg:px-36">
        {isLoading ? (
          <h1>
            <Loading />
          </h1>
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          data?.data
            ?.slice(0, 8)
            .map((product) => (
              <ProductsCard key={product._id} product={product} />
            ))
        )}
      </div>
    </>
  );
}
