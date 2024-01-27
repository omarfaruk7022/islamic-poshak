import auth from "@/firebase.init";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { format } from "date-fns";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaCartPlus } from "react-icons/fa";
import swal from "sweetalert";

export default function ProductsCard(product) {
  const { _id, name, image, price, description } = product.product;
  const [user, loading] = useAuthState(auth);
  const date = new Date();
  const formattedDate = format(date, "PP");
  const formattedDate2 = format(date, "p");
  const handleAddToCart = (e) => {
    e.preventDefault();

    const data = {
      orderDate: formattedDate,
      orderTime: formattedDate2,
      category: product?.data?.category,
      name: name,
      price: price,
      image: image,
      quantity: 1,
      deliveryAddress: "",
      email: user?.email,
    };
    if (data.quantity <= 0) {
      swal("Error!", "Quantity must be greater than 0!", "error");
      return;
    }

    fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        swal("Success!", "Product added to cart!", "success");
      }
    });
  };

  return (
    <div className="m-auto rounded-md mt-5 ">
      <div className=" block group  h-[310px]  border border-green-400 rounded-md hover:shadow-lg transition-shadow">
        <Link href={`/products/${_id}`}>
          <img
            priority
            src={image}
            alt="Product Image"
            className="h-[210px] rounded-md p-3 m-auto "
          />

          <div className="flex justify-between pt-3 px-2 border-t-2">
            <div>
              <h1 className="text-gray-800 dark:text-white font-bold text-lg">
                {name}
              </h1>
            </div>
            <p className="text-gray-800 dark:text-white font-bold text-sm">
              {price}৳
            </p>
          </div>
        </Link>
        <div className="flex justify-between p-2">
          <p
            className="text-gray-800 dark:text-white font-bold text-[12px]"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </p>
          <form onSubmit={handleAddToCart}>
            <button
              type="submit"
              class="block rounded bg-green-600 px-5 py-3 text-xs font-medium text-white hover:bg-green-500 cursor-pointer transition-all"
            >
              <FaCartPlus />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
