import React, { useEffect, useState } from "react";
import ProductsCard from "../Common/ProductsCard";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Common/Loading";

export default function ProductsComp() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("http://localhost:5000/api/product").then((res) => res.json()),
  });
  return (
    <>
      <h4 className="text-3xl text-center pt-10">
        Our Grocery <span className="text-green-500">Products</span>
      </h4>
      <p class="max-w-md mx-auto mt-4 text-gray-500 text-center">
        We have all off Grocery Products for you. We have all the latest Grocery
        Products for you.
      </p>

      <div className="grid grid-cols-1 gap-3  md:grid-cols-3 lg:grid-cols-6 px-0 lg:px-36">
        {isLoading ? (
          <h1>
            <Loading />
          </h1>
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          data?.data
            .filter((product) => product.category === "Grocery")
            ?.slice(0, 8)
            .map((product) => (
              <ProductsCard key={product._id} product={product} />
            ))
        )}
      </div>
    </>
  );
}
