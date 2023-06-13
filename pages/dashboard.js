import Loading from "@/Components/Common/Loading";
import NavbarOther from "@/Components/Common/NavbarOther";
import auth from "@/firebase.init";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Dashboard() {
  const router = useRouter();

  const [user,loading] = useAuthState(auth);

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
          <h1>Dashboard</h1>
        </>
      )}
    </div>
  );
}
