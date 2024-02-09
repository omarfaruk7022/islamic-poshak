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
    fetch(`https://frantic-crab-cape.cyclic.app/api/users/email/${email}`)
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

  console.log(userInfo?.data);
  return (
    <div>
      {user && userInfo ? (
        <>
          <div className="h-[500px]">
            <div className="bg-white dark:bg-black shadow-xl p-5 m-5 rounded-md">
              <p>{userInfo?.data[0]?.username}</p>
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
