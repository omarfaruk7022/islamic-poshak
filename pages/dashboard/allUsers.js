import Loading from "@/Components/Common/Loading";
import auth from "@/firebase.init";
import DashboardLayout from "@/layouts/dashboardLayout";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import cross from "../../assets/images/close.png";
import swal from "sweetalert";

export default function AllUsers() {
  const [allUsers, setAllUsers] = useState();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const email = user?.email;

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://bmw-server.onrender.com/api/users").then((res) =>
        res.json()
      ),
  });

  const isUserAdminQuery = useQuery({
    queryKey: ["isUserAdmin"],
    queryFn: () =>
      fetch(`https://bmw-server.onrender.com/api/users/email/${email}`).then(
        (res) => res.json()
      ),
  });

  const users = usersQuery.data;
  const userIsAdmin = isUserAdminQuery.data;

  const refetch = () => {
    usersQuery.refetch();
    isUserAdminQuery.refetch();
  };

  const isLoading = usersQuery.isLoading || isUserAdminQuery.isLoading;

  if (userIsAdmin?.data[0]?.role !== "admin" && userIsAdmin !== undefined) {
    router.push("/dashboard");
  }

  if (loading || isLoading) {
    return <Loading />;
  }
  if (userIsAdmin?.data[0]?.role !== "admin") {
    router.push("/dashboard");
  }

  const handleAdmin = (id) => {
    fetch(`https://bmw-server.onrender.com/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "admin" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          swal("Yayy", "Admin Added Successfully", "success");
          refetch();
        }
      });
  };

  const handleRemoveAdmin = (id) => {
    fetch(`https://bmw-server.onrender.com/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "Normal user" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          swal("Yayy", "Admin Removed Successfully", "success");
          refetch();
        }
      });
  };

  return (
    <div>
      {userIsAdmin?.data[0]?.role === "admin" ? (
        <>
          <div className="overflow-x-auto  p-5">
            <table className="min-w-full divide-y-2 divide-gray-100 dark:divide-gray-800 text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                    Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                    Email
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 dark:text-white">
                    Role
                  </th>
                  {userIsAdmin?.data[0]?.role === "admin" && (
                    <>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-center text-gray-900 dark:text-white">
                        Change Role
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              {users?.data?.map((user) => (
                <>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-2 font-medium  text-gray-700 dark:text-gray-200">
                        {user?.username}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                        {user?.email}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                        {user?.role === "admin" ? (
                          <span className="text-red-500">Admin</span>
                        ) : (
                          <span className="text-green-500">Normal user</span>
                        )}
                      </td>
                      {userIsAdmin?.data[0]?._id !== user?._id &&
                        user?.role !== "admin" && (
                          <>
                            <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                              <button
                                onClick={() => handleAdmin(user?._id)}
                                className="bg-green-500  text-white px-2 py-1 rounded-md"
                              >
                                Make Admin
                              </button>
                            </td>
                          </>
                        )}
                      {userIsAdmin?.data[0]?._id === user?._id && (
                        <>
                          <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                            <button className="bg-yellow-500 text-white text-[11px] px-2 py-1 rounded-md">
                              You Can't Change Your Role
                            </button>
                          </td>
                        </>
                      )}
                      {userIsAdmin?.data[0]?._id !== user?._id &&
                        user?.role === "admin" && (
                          <>
                            <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                              <button
                                onClick={() => handleRemoveAdmin(user?._id)}
                                className="bg-red-500 text-white px-2 py-1 rounded-md"
                              >
                                Remove Admin
                              </button>
                            </td>
                          </>
                        )}
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
      <p className="text-red-500 font-bold text-sm text-center p-5">
        Caution: No one has the right to remove anyone from here
      </p>
    </div>
  );
}
AllUsers.Layout = DashboardLayout;
