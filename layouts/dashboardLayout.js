import Loading from "@/Components/Common/Loading";
import NavbarOther from "@/Components/Common/NavbarOther";
import SideMenu from "@/Components/Dashboard/SideMenu";
import auth from "@/firebase.init";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    router.push("/login");
  }

  return (
    <div>
      <NavbarOther />
      <div className="flex">
        <div>
          <SideMenu />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
