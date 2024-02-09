import Loading from "@/Components/Common/Loading";
import auth from "@/firebase.init";
import DashboardLayout from "@/layouts/dashboardLayout";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import swal from "sweetalert";
import cross from "../../assets/images/close.png";

export default function AddProduct() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const email = user?.email;
  const isUserAdminQuery = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(
        `https://frantic-crab-cape.cyclic.app/api/users/email/${email}`
      ).then((res) => res.json()),
  });

  const data = isUserAdminQuery.data;
  const isLoading = isUserAdminQuery.isLoading;
  const error = isUserAdminQuery.error;
  if (data?.data[0]?.role !== "admin" && data !== undefined) {
    router.push("/dashboard");
  }
  const imgStorageKey = "7bd193c3ab5dcf0453572e262a763279";

  const handleSubmit = (e) => {
    e.preventDefault();
    const category = e.target.category.value;
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
            category,
            name,
            description,
            price,
            addedBy,
            image,
            status,
            quantity,
          };
          if (
            category &&
            name &&
            description &&
            price &&
            image &&
            quantity &&
            status &&
            addedBy
          ) {
            fetch("https://frantic-crab-cape.cyclic.app/api/product", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }).then((res) => {
              if (res.ok) {
                swal("Yayy", "Product Added Successfully", "success");
                e.target.name.value = "";
                e.target.description.value = "";
                e.target.price.value = "";
                e.target.quantity.value = "";
                e.target.image.value = "";
              } else {
                swal("Error", res.message, "error");
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
                  for="category"
                  className=" block overflow-hidden rounded-md border border-gray-300 dark:border-gray-200 py-2 shadow-sm focus-within:ring-1 w-full lg:w-96  m-auto"
                >
                  <select
                    name="category"
                    id="category"
                    className="text-sm border border-gray-300 p-2 dark:border-gray-200 lg:w-96 m-auto block peer h-8 w-full text-black dark:text-gray-200 text-[15px] border-none bg-transparent  placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  >
                    <option default>Select Category</option>
                    <option value="Borka">Borka </option>
                    <option value="Hijab">Hijab</option>
                    <option value="Abaya">Abaya</option>
                  </select>
                </label>

                <label
                  for="name"
                  className="relative block overflow-hidden rounded-md border border-gray-300 dark:border-gray-200 px-3 pt-3 shadow-sm  my-2 focus-within:ring-1 w-full lg:w-96  m-auto"
                >
                  <input
                    type="name"
                    id="name"
                    placeholder="Name"
                    required
                    className="peer h-8 w-full text-black  dark:text-gray-200 text-[15px] border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />

                  <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 dark:text-gray-200 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Product Name
                  </span>
                </label>
                <label
                  for="description"
                  className="relative block overflow-hidden rounded-md border border-gray-300  dark:border-gray-200 px-3 pt-3 shadow-sm  focus-within:ring-1 w-full lg:w-96 m-auto"
                >
                  <input
                    type="text"
                    id="description"
                    placeholder="Description"
                    required
                    className="peer h-8 w-full text-black dark:text-gray-200 text-[15px] border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />

                  <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 dark:text-gray-200 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Product Description
                  </span>
                </label>
                <label
                  for="price"
                  className="relative block my-2 overflow-hidden rounded-md border border-gray-300 dark:border-gray-200 px-3 pt-3 shadow-sm  focus-within:ring-1 w-full lg:w-96 m-auto"
                >
                  <input
                    type="text"
                    id="price"
                    placeholder="Price"
                    required
                    className="peer h-8 w-full text-black dark:text-gray-200 text-[15px] border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />

                  <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700  dark:text-gray-200 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Product Price per unit
                  </span>
                </label>
                <label
                  for="quantity"
                  className="relative block my-2 overflow-hidden rounded-md border border-gray-300 dark:border-gray-200 px-3 pt-3 shadow-sm  focus-within:ring-1 w-full lg:w-96 m-auto"
                >
                  <input
                    type="number"
                    id="quantity"
                    placeholder="Quantity"
                    required
                    className="peer h-8 w-full  text-[15px] border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />

                  <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 dark:text-gray-200 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Available Quantity
                  </span>
                </label>
                {/* <label
                  for="status"
                  className="relative block my-2 overflow-hidden rounded-md border border-gray-300 dark:border-gray-200 px-3 pt-3 shadow-sm  focus-within:ring-1 w-full lg:w-96 m-auto"
                >
                  <input
                    type="text"
                    id="status"
                    placeholder="Status"
                    required
                    className="peer h-8 w-full text-[15px] border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />

                  <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 dark:text-gray-200 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Product Status
                  </span>
                </label> */}

                <label
                  for="status"
                  className=" block overflow-hidden rounded-md border border-gray-300 dark:border-gray-200 py-2 shadow-sm focus-within:ring-1 w-full lg:w-96  m-auto"
                >
                  <select
                    name="status"
                    id="status"
                    required
                    className="text-sm border border-gray-300 p-2 dark:border-gray-200 lg:w-96 m-auto block peer h-8 w-full text-black dark:text-gray-200 text-[15px] border-none bg-transparent  placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  >
                    <option default>Product Status</option>
                    <option value="in-stock">in-stock</option>
                    <option value="out-of-stock">out-of-stock</option>
                  </select>
                </label>
                <input
                  type="file"
                  name="image"
                  placeholder="Image"
                  required
                  className="peer h-8  m-auto block my-3  text-black dark:text-gray-200 text-[15px] border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm w-full lg:w-96"
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
        <>
          {data?.data[0]?.role !== "admin" &&
          data !== undefined &&
          router.push("/dashboard") ? (
            <div className="m-5">
              <h2 className="text-red-500 font-bold text-center text-xl">
                You Are Not Authenticated Redirecting to Dashboard
              </h2>
              <div className="flex justify-center items-center my-2">
                <Image src={cross} alt="" width={100} height={100}></Image>
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </>
      )}
    </div>
  );
}

AddProduct.Layout = DashboardLayout;
