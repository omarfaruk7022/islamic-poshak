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

export default function AllOrders() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const email = user?.email;

  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch("http://localhost:5000/api/cart").then((res) => res.json()),
  });

  const isUserAdminQuery = useQuery({
    queryKey: ["isUserAdmin"],
    queryFn: () =>
      fetch(`http://localhost:5000/api/users/email/${email}`).then((res) =>
        res.json()
      ),
  });
  const orders = ordersQuery.data;

  const userIsAdmin = isUserAdminQuery.data;
  const refetch = () => {
    isUserAdminQuery.refetch();
    ordersQuery.refetch();
  };

  const isLoading = isUserAdminQuery.isLoading || ordersQuery.isLoading;

  if (userIsAdmin?.data[0]?.role !== "admin" && userIsAdmin !== undefined) {
    router.push("/dashboard");
  }

  if (loading || isLoading) {
    return <Loading />;
  }
  if (userIsAdmin?.data[0]?.role !== "admin") {
    router.push("/dashboard");
  }

  const handleStatus = (e, id, status) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/cart/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderStatus: status }),
    })
      .then((res) => res.json())
      .then((data) => {
        swal("Updated!", "Your Order Status has been updated!", "success");
        refetch();
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/cart/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        swal("Deleted!", "Your Order has been deleted!", "success");
        refetch();
      });
  };
  return (
    <div>
      {userIsAdmin?.data[0]?.role === "admin" ? (
        <>
          <div className="overflow-x-auto overflow-auto   p-5">
            <table className="min-w-full divide-y-2 divide-gray-100 dark:divide-gray-800 text-sm ">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                    Image
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                    Product name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                    Price
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                    Quantity
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                    Ordered by
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                    Delivery Address
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                    Order Date
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                    Order Status
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                    Action
                  </th>
                </tr>
              </thead>
              {orders?.data?.map((order) => (
                <>
                  <tbody className="divide-y divide-gray-200 overflow-auto ">
                    <tr>
                      <td className="">
                        <Image
                          src={order?.image}
                          alt=""
                          width={100}
                          height={100}
                        ></Image>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                        {order?.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                        {order?.price}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                        {order?.quantity}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                        {order?.email}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                        {order?.deliveryAddress}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                        {order?.orderTime} , {order?.orderDate}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                        <form
                          className="lg:flex  items-center"
                          //   onSubmit={(e) => handleStatus(e, order?._id)}
                        >
                          <div className="form-control  ">
                            <select
                              onChange={(e) =>
                                handleStatus(e, order?._id, e.target.value)
                              }
                              name="status"
                              className="text-[13px] rounded-md w-28 h-10 bg-white dark:bg-black outline-none focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-700 focus:border-transparent "
                            >
                              <option
                                className="text-black dark:text-white"
                                default
                              >
                                {order?.orderStatus}
                              </option>

                              {order?.orderStatus !== "Pending" && (
                                <option className="text-black dark:text-white">
                                  Pending
                                </option>
                              )}
                              {order?.orderStatus !== "Processing" && (
                                <option className="text-black dark:text-white">
                                  Processing
                                </option>
                              )}
                              {order?.orderStatus !== "Confirmed" && (
                                <option className="text-black dark:text-white">
                                  Confirmed
                                </option>
                              )}
                              {order?.orderStatus !== "Delivered" && (
                                <option className="text-black dark:text-white">
                                  Delivered
                                </option>
                              )}
                              {order?.orderStatus !== "Canceled" && (
                                <option className="text-black dark:text-white">
                                  Canceled
                                </option>
                              )}
                            </select>
                          </div>
                        </form>
                      </td>
                      <td>
                        <div className="ml-2">
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded-md"
                            onClick={() => {
                              handleDelete(order?._id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
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

AllOrders.Layout = DashboardLayout;
