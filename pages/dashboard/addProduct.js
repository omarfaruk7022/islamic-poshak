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

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const price = e.target.price.value;
    const unit = e.target.unit.value;
    const image = e.target.image.value;
    const quantity = e.target.quantity.value;
    const data = {
      name,
      description,
      price,
      unit,
      image,
      quantity,
    };

    if (name && description && price && unit && image) {
      fetch("http://localhost:5000/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.ok) {
          swal("Yayy", "Product Added Successfully", "success");
        }
        else{
          swal("Error", "Product Added Failed", "error");
        }
      });
    }
  };
  console.log(data);
  if (error) {
    console.log(error);
  }
  if (loading) {
    return <Loading />;
  }
  if (isLoading) {
    return <Loading />;
  }
  if (data == undefined) {
    return <Loading />;
  } else if (data?.data[0]?.role !== "admin") {
    router.push("/dashboard");
  }
  if (!user) {
    router.push("/login");
  }

  return (
    <div>
      {data?.data[0]?.role === "admin" ? (
        <>
          <div className="bg-white w-[50%] m-auto">
            <form className="p-5" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="p-2 w-96 m-auto block bg-red-50 rounded-md outline-none my-2"
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                className="p-2 w-96 m-auto block bg-red-50 rounded-md outline-none my-2"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="p-2 w-96 m-auto block bg-red-50 rounded-md outline-none my-2"
              />
              <input
                type="text"
                name="unit"
                placeholder="Unit"
                className="p-2 w-96 m-auto block bg-red-50 rounded-md outline-none my-2"
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                className="p-2 w-96 m-auto block bg-red-50 rounded-md outline-none my-2"
              />
              <input
                type="text"
                name="image"
                placeholder="Image"
                className="p-2 w-96 m-auto block bg-red-50 rounded-md outline-none my-2"
              />
              <input
                type="submit"
                value="Submit"
                className="p-4 w-52 rounded-lg m-auto block bg-green-400 cursor-pointer text-sm"
              />
            </form>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

AddProduct.Layout = DashboardLayout;
