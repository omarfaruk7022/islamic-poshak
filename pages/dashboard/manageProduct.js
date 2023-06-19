import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/dashboardLayout";
import { useQuery } from "@tanstack/react-query";
import swal from "sweetalert";

export default function ManageProduct() {
  //   const [products, setProducts] = useState([]);
  const updateData = {
    name: "Honda",
    description: "Honda is a car",
    price: 10000,
    unit: "car",
    status: "active",
    image: "https://i.ibb.co/9HZqYqP/sports-car.jpg",
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("http://localhost:5000/api/product").then((res) => res.json()),
  });

  const handleEdit = (id) => {
    fetch(`http://localhost:5000/api/product/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "fail") {
          swal("Error", "Product Update Failed", "error");
        } else {
          swal("Yayy", "Product Update Successfully Completed", "success");
          refetch();
        }
      });
  };

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are You want to Delete this Product? ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:5000/api/product/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "fail") {
              swal("Error", "Product Delete Failed", "error");
            } else {
              swal("Yayy", "Product Delete Successfully Completed", "success");
              refetch();
            }
          });
      }
    });
  };

  return (
    <div>
      <div class="overflow-x-auto  p-5">
        <table class="min-w-full divide-y-2 divide-gray-100 text-sm">
          <thead class="ltr:text-left rtl:text-right">
            <tr>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900">
                Name
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900">
                Description
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900">
                Price
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900">
                Unit
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900">
                Status
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900">
                Action
              </th>
            </tr>
          </thead>
          {data?.data?.map((product) => (
            <>
              <tbody class="divide-y divide-gray-200">
                <tr>
                  <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {product?.name}
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product?.description}
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product?.price}
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product?.unit}
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product?.status}
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                    <button
                      onClick={() => handleEdit(product?._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded-md"
                    >
                      Edit
                    </button>
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                    <button
                      onClick={() => handleDelete(product?._id)}
                      className="bg-red-600 text-white px-2 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </>
          ))}
        </table>
      </div>
    </div>
  );
}

ManageProduct.Layout = DashboardLayout;
