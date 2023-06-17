import NavbarOther from "@/Components/Common/NavbarOther";
import HomeChart from "@/Components/Dashboard/HomeChart";
import SideMenu from "@/Components/Dashboard/SideMenu";
import DashboardLayout from "@/layouts/dashboardLayout";
import React from "react";

export default function dashboard() {
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

dashboard.Layout = DashboardLayout;
