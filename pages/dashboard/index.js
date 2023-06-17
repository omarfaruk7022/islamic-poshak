import Loading from "@/Components/Common/Loading";
import NavbarOther from "@/Components/Common/NavbarOther";
import HomeChart from "@/Components/Dashboard/HomeChart";
import SideMenu from "@/Components/Dashboard/SideMenu";
import auth from "@/firebase.init";
import DashboardLayout from "@/layouts/dashboardLayout";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Dashboard() {
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
      <div>
        <div>
          <HomeChart />
        </div>
      </div>
    </div>
  );
}

Dashboard.Layout = DashboardLayout;
