import React, { useEffect, useState } from "react";
import ProductsCard from "../Common/ProductsCard";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Common/Loading";

export default function ProductsComp() {
  // const [products,setProducts] = useState()
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("http://localhost:5000/api/product").then((res) => res.json()),
  });
  //   useEffect(() => {
  //     fetch("http://localhost:5000/api/product")
  //     .then(res => res.json())
  //     .then(data => setProducts(data))
  //   },[])

  return (
    <div className="grid grid-cols-1 gap-3 px-4 md:grid-cols-2 lg:grid-cols-4">
      {isLoading ? (
        <h1>
          <Loading />
        </h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        data?.data.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
}
