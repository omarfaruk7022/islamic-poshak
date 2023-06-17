import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductsCard(product) {
  const { _id, name, image, price } = product.product;

  return (
    <div className="m-auto">
      <Link href={`/products/${_id}`} className="relative block group">
        <Image
          width={350}
          priority
          height={350}
          src={image}
          alt="Product Image"
          className="h-[250px] w-full object-cover transition duration-500 group-hover:opacity-90 sm:h-[450px]"
        />

        <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
          <h3 className="text-xl font-medium text-white">{name}</h3>

          <p className="mt-1.5 max-w-[40ch] text-xs text-white">{price}</p>

          <span className="inline-block px-5 py-3 mt-3 text-xs font-medium tracking-wide text-white uppercase bg-black">
            Shop Now
          </span>
        </div>
      </Link>
    </div>
  );
}
