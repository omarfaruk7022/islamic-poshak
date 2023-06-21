import Loading from "@/Components/Common/Loading";
import auth from "@/firebase.init";
import DashboardLayout from "@/layouts/dashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import swal from "sweetalert";

export default function AddProduct() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const email = user?.email;
  const { isLoading, error, data } = useQuery({
    queryFn: () =>
      fetch(`http://localhost:5000/api/users/email/${email}`).then((res) =>
        res.json()
      ),
  });
  const imgStorageKey = "7bd193c3ab5dcf0453572e262a763279";

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const price = e.target.price.value;
    const quantity = e.target.quantity.value;
    const status = e.target.status.value;
    const addedBy = email;
    const img = e.target.image.files[0];
    const formData = new FormData();
    formData.append("image", img);
    const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const image = result.data.url;
          const data = {
            name,
            description,
            price,
            addedBy,
            image,
            status,
            quantity,
          };
          if (
            name &&
            description &&
            price &&
            image &&
            quantity &&
            status &&
            addedBy
          ) {
            fetch("http://localhost:5000/api/product", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }).then((res) => {
              if (res.ok) {
                swal("Yayy", "Product Added Successfully", "success");
              } else {
                swal("Error", "Product Added Failed", "error");
              }
            });
          }
        }
      });
  };
  if (error) {
    console.log(error);
  }
  if (loading || isLoading || data == undefined) {
    return <Loading />;
  }
  if (data?.data[0]?.role !== "admin") {
    router.push("/dashboard");
  }
  if (!user) {
    router.push("/login");
  }

  return (
    <div>
      {data?.data[0]?.role === "admin" ? (
        <>
          <div>
            <div className="p-1 lg:p-24">
              <h2 className="text-black dark:text-white text-center text-xl p-5 font-bold ">
                Add Product
              </h2>
              <form className="p-5" onSubmit={handleSubmit}>
                <label
                  for="name"
                  class="relative block overflow-hidden rounded-md border border-gray-300 dark:border-gray-200 px-3 pt-3 shadow-sm  my-2 focus-within:ring-1 w-full lg:w-96  m-auto"
                >
                  <input
                    type="name"
                    id="name"
                    placeholder="Name"
                    required
                    class="peer h-8 w-full text-black  dark:text-gray-200 text-[15px] border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />

                  <span class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 dark:text-gray-200 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Name
                  </span>
                </label>
                <label
                  for="description"
                  class="relative block overflow-hidden rounded-md border border-gray-300  dark:border-gray-200 px-3 pt-3 shadow-sm  focus-within:ring-1 w-full lg:w-96 m-auto"
                >
                  <input
                    type="name"
                    id="description"
                    placeholder="Description"
                    required
                    class="peer h-8 w-full text-black dark:text-gray-200 text-[15px] border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />

                  <span class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 dark:text-gray-200 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Description
                  </span>
                </label>
                <label
                  for="price"
                  class="relative block my-2 overflow-hidden rounded-md border border-gray-300 dark:border-gray-200 px-3 pt-3 shadow-sm  focus-within:ring-1 w-full lg:w-96 m-auto"
                >
                  <input
                    type="text"
                    id="price"
                    placeholder="Price"
                    required
                    class="peer h-8 w-full text-black dark:text-gray-200 text-[15px] border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />

                  <span class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700  dark:text-gray-200 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Price
                  </span>
                </label>
                <label
                  for="quantity"
                  class="relative block my-2 overflow-hidden rounded-md border border-gray-300 dark:border-gray-200 px-3 pt-3 shadow-sm  focus-within:ring-1 w-full lg:w-96 m-auto"
                >
                  <input
                    type="number"
                    id="quantity"
                    placeholder="Quantity"
                    required
                    class="peer h-8 w-full  text-[15px] border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />

                  <span class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 dark:text-gray-200 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Quantity
                  </span>
                </label>
                <label
                  for="status"
                  class="relative block my-2 overflow-hidden rounded-md border border-gray-300 dark:border-gray-200 px-3 pt-3 shadow-sm  focus-within:ring-1 w-full lg:w-96 m-auto"
                >
                  <input
                    type="text"
                    id="status"
                    placeholder="Status"
                    required
                    class="peer h-8 w-full text-[15px] border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />

                  <span class="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 dark:text-gray-200 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Status
                  </span>
                </label>

                <input
                  type="file"
                  name="image"
                  placeholder="Image"
                  required
                  class="peer h-8  m-auto block my-3  text-black dark:text-gray-200 text-[15px] border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm w-full lg:w-96"
                />

                <div className="flex justify-center">
                  <input
                    type="submit"
                    value="Submit"
                    className="p-4 w-24  rounded-lg  bg-green-400 cursor-pointer text-sm text-black text-[15px]"
                  />
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

AddProduct.Layout = DashboardLayout;
