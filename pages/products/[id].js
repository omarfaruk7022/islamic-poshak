import Loading from "@/Components/Common/Loading";
import NavbarOther from "@/Components/Common/NavbarOther";
import Navbar from "@/Components/Home/Navbar";
import auth from "@/firebase.init";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import swal from "sweetalert";

export default function productDetails() {
  const date = new Date();
  const formattedDate = format(date, "PP");
  const formattedDate2 = format(date, "p");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { id } = router.query;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [product, setProduct] = useState();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetch(`http://localhost:5000/api/product/${id}`)
      .then((res) => res.json())
      .then((json) => setProduct(json));
  }, [id]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    router.push("/login");
  }
  console.log(product);
  const handleAddToCart = (e) => {
    e.preventDefault();

    const data = {
      orderDate: formattedDate,
      orderTime: formattedDate2,
      category: product?.data?.category,
      name: product?.data?.name,
      price: product?.data?.price,
      image: product?.data?.image,
      quantity: e.target.quantity.value,
      deliveryAddress: e.target.address.value,
      email: user?.email,
    };
    if (data.quantity <= 0) {
      swal("Error!", "Quantity must be greater than 0!", "error");
      return;
    }
    if (data.deliveryAddress === "") {
      swal("Error!", "Delivery Address is required!", "error");
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
    <div>
      {user && (
        <>
          <Navbar />
          
          <section>
            <div class="relative mx-auto max-w-screen-xl px-4 py-8">
              <div class="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
                <div class="grid grid-cols-2 gap-4 md:grid-cols-1">
                  <Image
                    width={300}
                    height={300}
                    alt=""
                    src={product?.data?.image}
                    class=" w-full rounded-xl object-cover"
                  />

                  {/* <div class="grid grid-cols-2 gap-4 lg:mt-4">
                    <Image
                      width={300}
                      height={300}
                      alt="Les Paul"
                      src={product?.data?.image}
                      class="aspect-square w-full rounded-xl object-cover"
                    />

                    <Image
                      width={300}
                      height={300}
                      alt="Les Paul"
                      src={product?.data?.image}
                      class="aspect-square w-full rounded-xl object-cover"
                    />

                    <Image
                      width={300}
                      height={300}
                      alt="Les Paul"
                      src={product?.data?.image}
                      class="aspect-square w-full rounded-xl object-cover"
                    />

                    <Image
                      width={300}
                      height={300}
                      alt=""
                      src={product?.data?.image}
                      class="aspect-square w-full rounded-xl object-cover"
                    />
                  </div> */}
                </div>

                <div class="sticky top-0 ">
                  <strong class="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600">
                    Pre Order
                  </strong>

                  <div class="mt-8 flex justify-between">
                    <div class="max-w-[35ch] space-y-2">
                      <h1 class="text-xl font-bold sm:text-2xl">
                        {product?.data?.name}
                      </h1>
                      <h1 class="text-xl font-bold sm:text-2xl">
                        Category: {product?.data?.category}
                      </h1>

                      <div class="-ms-0.5 flex">
                        <svg
                          class="h-5 w-5 text-yellow-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>

                        <svg
                          class="h-5 w-5 text-yellow-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>

                        <svg
                          class="h-5 w-5 text-yellow-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>

                        <svg
                          class="h-5 w-5 text-yellow-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>

                        <svg
                          class="h-5 w-5 text-gray-200"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>

                    <p class="text-lg font-bold">৳{product?.data?.price}</p>
                  </div>

                  <div class="mt-4">
                    <div class="prose max-w-none">
                      <p className="text-sm text-black dark:text-gray-300">
                        {product?.data?.description}
                      </p>
                    </div>

                    <button class="mt-2 text-sm font-medium underline">
                      Read More
                    </button>
                  </div>

                  <form class="mt-8" onSubmit={handleAddToCart}>
                    <fieldset>
                      {/* <div class="flex flex-wrap gap-1">
                        <label for="color_tt" class="cursor-pointer">
                          <input
                            type="radio"
                            name="color"
                            value="Texas Tea"
                            id="color_tt"
                            class="peer sr-only"
                          />

                          <span class="group inline-block rounded-full border px-3 py-1 text-xs font-medium peer-checked:bg-black peer-checked:text-white">
                            Texas Tea
                          </span>
                        </label>

                        <label for="color_fr" class="cursor-pointer">
                          <input
                            type="radio"
                            name="color"
                            value="Fiesta Red"
                            id="color_fr"
                            class="peer sr-only"
                          />

                          <span class="group inline-block rounded-full border px-3 py-1 text-xs font-medium peer-checked:bg-black peer-checked:text-white">
                            Fiesta Red
                          </span>
                        </label>

                        <label for="color_cb" class="cursor-pointer">
                          <input
                            type="radio"
                            name="color"
                            value="Cobalt Blue"
                            id="color_cb"
                            class="peer sr-only "
                          />

                          <span class="group inline-block rounded-full border px-3 py-1 text-xs font-medium peer-checked:bg-black peer-checked:text-white">
                            Cobalt Blue
                          </span>
                        </label>
                      </div> */}
                      <div class="mt-8 flex gap-4">
                        <label for="quantity" class="sr-only">
                          Qty
                        </label>

                        <input
                          type="number"
                          id="quantity"
                          name="quantity"
                          min="1"
                          defaultValue="1"
                          placeholder="Qty"
                          class="w-12 rounded text-black dark:text-white bg-white border-gray-300 dark:border-gray-800 dark:bg-black py-3 text-center text-xs [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                        />

                        {/* <input
                          type="text"
                          name="address"
                          placeholder="ডেলিভারী ঠিকনা"
                          className="inline-block w-96 rounded  py-3 text-center text-xs focus:outline-none focus:ring-0 text-black dark:text-white bg-white border-gray-300 dark:border-gray-800 dark:bg-black"
                        /> */}
                        <input
                          type="submit"
                          class="block rounded bg-green-600 px-5 py-3 text-xs font-medium text-white hover:bg-green-500 cursor-pointer transition-all"
                          value="Add to Cart"
                        />
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
