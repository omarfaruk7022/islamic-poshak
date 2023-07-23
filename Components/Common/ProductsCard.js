import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductsCard(product) {
  const { _id, name, image, price } = product.product;

  return (
    <div className="m-auto bg-[#001C30] dark:bg-gray-200">
      <Link href={`/products/${_id}`} className=" block group w-80">
        <Image
          width={350}
          priority
          height={350}
          src={image}
          alt="Product Image"
          className="h-[250px] w-full object-cover  "
        />

        <div className=" inset-0 flex flex-col items-start justify-end p-6 ">
          <h3 className="text-xl font-medium text-white dark:text-black">
            {name}
          </h3>

          <p className="mt-1.5 max-w-[40ch] text-xs text-white dark:text-black">
            {price}
          </p>

          <span className="inline-block px-4 py-2 mt-2 text-xs font-medium text-black dark:text-white uppercase bg-white dark:bg-black">
            Shop Now
          </span>
        </div>
      </Link>
    </div>
  );
}
