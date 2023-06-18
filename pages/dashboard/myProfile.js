import Loading from "@/Components/Common/Loading";
import auth from "@/firebase.init";
import DashboardLayout from "@/layouts/dashboardLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function MyProfile() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState();

  const [user, loading] = useAuthState(auth);
  const email = user?.email;

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/email/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
      });
  }, [email]);

  if (loading) {
    return <Loading />;
  }
  if (!user) {
    router.push("/login");
  }

  return (
    <div>
      {user && userInfo ? (
        <>
          <p>{userInfo?.data[0]?.email}</p>
          <p>{userInfo?.data[0]?.role}</p>
        </>
      ) :(
        <Loading />
      )}
 
    </div>
  );
}

MyProfile.Layout = DashboardLayout;
