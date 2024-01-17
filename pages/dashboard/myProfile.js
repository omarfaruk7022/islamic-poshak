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
          <div className="h-[500px]">
            <div className="bg-white dark:bg-black shadow-xl p-5 m-5 rounded-md">
              <p>Under maintenance</p>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

MyProfile.Layout = DashboardLayout;
