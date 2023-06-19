import DashboardLayout from "@/layouts/dashboardLayout";
import React, { useEffect, useState } from "react";

export default function AllUsers() {
  const [allUsers, setAllUsers] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/api/users`)
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data);
      });
  }, []);
  console.log(allUsers?.data);
  return (
    <div>
      <div class="overflow-x-auto  p-5">
        <table class="min-w-full divide-y-2 divide-gray-200 text-sm">
          <thead class="ltr:text-left rtl:text-right">
            <tr>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900">
                Name
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900">
                Email
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900">
                Role
              </th>

              <th class="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900">
                Action
              </th>
            </tr>
          </thead>
          {allUsers?.data?.map((user) => (
            <>
              <tbody class="divide-y divide-gray-200">
                <tr>
                  <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {user?.username}
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {user?.email}
                  </td>
                  <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {user?.role === "admin" ? (
                      <span className="text-red-500">{user?.role}</span>
                    ) : (
                      <span className="text-green-500">Normal user</span>
                    )}
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
AllUsers.Layout = DashboardLayout;
