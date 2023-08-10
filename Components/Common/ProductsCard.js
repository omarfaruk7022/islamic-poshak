import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductsCard(product) {
  const { _id, name, image, price, description } = product.product;

  return (
    <div className="m-auto rounded-md mt-5 ">
      <Link
        href={`/products/${_id}`}
        className=" block group  h-[310px]  border border-green-400 rounded-md hover:shadow-lg transition-shadow"
      >
        <Image
          width={350}
          priority
          height={350}
          src={image}
          alt="Product Image"
          className="h-[210px] rounded-md p-3 m-auto"
        />

        <div className="flex justify-between pt-3 px-2">
          <div>
            <h1 className="text-gray-800 dark:text-white font-bold text-lg">
              {name}
            </h1>
            <p className="text-gray-800 dark:text-white font-bold text-[12px]">
              {description}
            </p>
          </div>
          <p className="text-gray-800 dark:text-white font-bold text-sm">
            {price}৳
          </p>
        </div>
      </Link>
    </div>
  );
}
