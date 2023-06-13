import Loading from "@/Components/Common/Loading";
import NavbarOther from "@/Components/Common/NavbarOther";
import auth from "@/firebase.init";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Profile() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState();

  const [user, loading] = useAuthState(auth);
  const email = user?.email;
 console.log(email)

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
      });
  }, [email]);

  console.log(userInfo);
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    router.push("/login");
  }

  return (
    <div>
      {user && (
        <>
          <NavbarOther />
          <h1>Profile</h1>
          <p>{user.email}</p>
        </>
      )}
    </div>
  );
}
