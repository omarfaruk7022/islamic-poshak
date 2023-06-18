import Loading from "@/Components/Common/Loading";
import NavbarOther from "@/Components/Common/NavbarOther";
import SideMenu from "@/Components/Dashboard/SideMenu";
import auth from "@/firebase.init";
import { CssVarsProvider, Sheet } from "@mui/joy";
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
      <CssVarsProvider>
        <main>
          <Sheet>
            <NavbarOther />
            <div className="flex">
              <div className="w-[200px]">
                <SideMenu />
              </div>
              <div className="w-full h-full ">{children}</div>
            </div>
          </Sheet>
        </main>
      </CssVarsProvider>
    </div>
  );
}
