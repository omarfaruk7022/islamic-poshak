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
    <div className="grid grid-cols-1 gap-3  md:grid-cols-2 lg:grid-cols-4 px-0 lg:px-24">
      {isLoading ? (
        <h1>
          <Loading />
        </h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        data?.data?.map((product) => (
          <ProductsCard key={product._id} product={product} />
        ))
      )}
    </div>
  );
}
