import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/dashboardLayout";
import { useQuery } from "@tanstack/react-query";
import swal from "sweetalert";
import Image from "next/image";
import { Dialog } from "primereact/dialog";
import EditModal from "@/Components/Dashboard/EditModal";

export default function ManageProduct() {
  const [visible, setVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);


  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("http://localhost:5000/api/product").then((res) => res.json()),
  });

  const handleEdit = (id) => {
    setVisible(true);
    setSelectedItemId(id);
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
              <th class="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                Image
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                Name
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                Description
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                Price
              </th>

              <th class="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                Status
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                Added By
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          {data?.data?.map((product) => (
            <>
              <tbody class="divide-y divide-gray-200">
                <tr>
                  <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-200">
                    <Image
                      width={150}
                      height={100}
                      className="rounded-md h-24"
                      draggable={false}
                      src={product?.image}
                      alt=""
                    ></Image>
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-200">
                    {product?.name}
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                    {product?.description}
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                    {product?.price}
                  </td>

                  <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                    {product?.status}
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                    {product?.addedBy}
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                    <button
                      label="Show"
                      icon="pi pi-external-link"
                      onClick={() => handleEdit(product?._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded-md"
                    >
                      Edit
                    </button>
                  </td>
                  {visible && <EditModal id={selectedItemId} visible={visible} setVisible={setVisible} refetch={refetch}/>}
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
