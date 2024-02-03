import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Loading from "../Common/Loading";
import Image from "next/image";
import Link from "next/link";

export default function Fashions() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("http://localhost:5000/api/product").then((res) => res.json()),
  });

  return (
    <div>
      <section>
        <div className=" px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <header className="text-center">
            <h4 className="text-3xl text-center pt-10">
              Our Fashion <span className="text-green-500">Collections</span>
            </h4>

            <p className="max-w-md mx-auto mt-4 text-gray-500">
              We have worlds best cotton and woolen clothes for you. We have all
              the latest fashion collection for you.
            </p>
          </header>

          {isLoading ? (
            <div>
              <Loading />
            </div>
          ) : error ? (
            <h1>{error}</h1>
          ) : null}
          <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-4">
            {data?.data
              .filter((product) => product.category === "Dress")
              ?.slice(0, 8)
              .map((product) => (
                <>
                  <Link href={`/products/${product._id}`}>
                    <li>
                      <a href="#" className="relative block group">
                        <Image
                          src={product.image}
                          width={350}
                          height={350}
                          alt=""
                          className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                        />

                        <div className="absolute inset-0 flex flex-col justify-end p-6">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-xl font-medium text-white">
                                {product.name}
                              </h3>

                              <p>
                                <span className="text-lg font-medium text-white">
                                  {product.description}
                                </span>
                              </p>
                            </div>
                            <div>
                              <p>
                                <span className="text-lg font-medium text-white">
                                  {product.price}৳
                                </span>
                              </p>
                              <span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                                Shop Now
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  </Link>
                </>
              ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
