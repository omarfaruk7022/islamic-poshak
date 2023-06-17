import Loading from "@/Components/Common/Loading";
import auth from "@/firebase.init";
import DashboardLayout from "@/layouts/dashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

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
          <h1>Admin</h1>
          <h2>{data?.data[0]?.username}</h2>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

AddProduct.Layout = DashboardLayout;
