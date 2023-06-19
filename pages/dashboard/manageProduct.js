import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/dashboardLayout";

export default function ManageProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/product`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <div>
      <div class="overflow-x-auto  p-5">
        <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
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
          {products?.data?.map((product) => (
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
                    <button className="bg-green-500 text-white px-2 py-1 rounded-md">
                      Edit
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
