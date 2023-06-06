import Image from "next/image";
import React from "react";

export default function ProductsCard(product) {
  const { id, name, image, price } = product.product;
  return (
    <div className="m-auto">
      <a href="#" class="relative block group">
        <Image
          width={350}
          height={350}
          src={image}
          alt=""
          class="h-[250px] w-full object-cover transition duration-500 group-hover:opacity-90 sm:h-[450px]"
        />

        <div class="absolute inset-0 flex flex-col items-start justify-end p-6">
          <h3 class="text-xl font-medium text-white">{name}</h3>

          <p class="mt-1.5 max-w-[40ch] text-xs text-white">{price}</p>

          <span class="inline-block px-5 py-3 mt-3 text-xs font-medium tracking-wide text-white uppercase bg-black">
            Shop Now
          </span>
        </div>
      </a>
    </div>
  );
}
