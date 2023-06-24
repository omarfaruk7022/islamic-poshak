import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/dashboardLayout";
import { useQuery } from "@tanstack/react-query";
import swal from "sweetalert";
import Image from "next/image";
import EditModal from "@/Components/Dashboard/EditModal";
import auth from "@/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Loading from "@/Components/Common/Loading";
import cross from "../../assets/images/close.png";

export default function ManageProduct() {
  const [visible, setVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [user] = useAuthState(auth);
  const email = user?.email;
  const router = useRouter();
  const [userInfo, setUserInfo] = useState();

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://bmw-server.onrender.com/api/product").then((res) => res.json()),
  });

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(`https://bmw-server.onrender.com/api/users/email/${email}`).then((res) =>
        res.json()
      ),
  });

  const products = productsQuery.data;
  const userIsAdmin = usersQuery.data;

  const refetch = () => {
    productsQuery.refetch();
    usersQuery.refetch();
  };
  if (userIsAdmin?.data[0]?.role !== "admin" && userIsAdmin !== undefined) {
    router.push("/dashboard");
  }
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
        fetch(`https://bmw-server.onrender.com/api/product/${id}`, {
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
      {userIsAdmin?.data[0]?.role === "admin" && userIsAdmin !== undefined ? (
        <>
          <div className="overflow-x-auto  p-5">
            <table className="min-w-full divide-y-2 divide-gray-100 dark:divide-gray-800 text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr className="">
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                    Image
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                    Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                    Description
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                    Price
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                    Quantity
                  </th>

                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                    Added By
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                    Action
                  </th>
                </tr>
              </thead>
              {products?.data?.map((product) => (
                <>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-200">
                        <Image
                          width={150}
                          height={100}
                          className="rounded-md h-24"
                          draggable={false}
                          src={product?.image}
                          alt=""
                        ></Image>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-200">
                        {product?.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                        {product?.description}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                        {product?.price}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                        {product?.quantity}
                      </td>

                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                        {product?.status === "in-stock" && (
                          <p className="text-green-500">In-stock</p>
                        )}
                        {product?.status === "out-of-stock" && (
                          <p className="text-red-500">Out-of-stock</p>
                        )}
                        {product?.status === "discontinued" && (
                          <p className="text-red-500">Discontinued</p>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                        {product?.addedBy}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                        <button
                          label="Show"
                          icon="pi pi-external-link"
                          onClick={() => handleEdit(product?._id)}
                          className="bg-green-500 text-white px-2 py-1 rounded-md"
                        >
                          Edit
                        </button>
                      </td>
                      {visible && (
                        <EditModal
                          id={selectedItemId}
                          visible={visible}
                          setVisible={setVisible}
                          refetch={refetch}
                        />
                      )}
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
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
        </>
      ) : (
        <>
          {userIsAdmin?.data[0]?.role !== "admin" &&
          userIsAdmin !== undefined &&
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

ManageProduct.Layout = DashboardLayout;
