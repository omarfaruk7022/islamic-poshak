import NavbarOther from "@/Components/Common/NavbarOther";
import SideMenu from "@/Components/Dashboard/SideMenu";
import React from "react";

export default function DashboardLayout({ children }) {
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
