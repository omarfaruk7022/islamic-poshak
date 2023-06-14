import NavbarOther from "@/Components/Common/NavbarOther";
import HomeChart from "@/Components/Dashboard/HomeChart";
import SideMenu from "@/Components/Dashboard/SideMenu";
import React from "react";

export default function dashboard() {
  return (
    <div>
      <NavbarOther />
      <div className="flex">
        <div>
          <SideMenu />
        </div>
        <div>
          <HomeChart />
        </div>
      </div>
    </div>
  );
}
