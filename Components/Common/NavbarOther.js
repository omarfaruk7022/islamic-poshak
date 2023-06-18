import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo-light.svg";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "@/firebase.init";
import { signOut } from "firebase/auth";
import { Sidebar } from "primereact/sidebar";
import MobileMenu from "../Dashboard/MobileMenu";
import { Button, useColorScheme } from "@mui/joy";


export default function NavbarOther() {
  const [user] = useAuthState(auth);
  const [visible, setVisible] = useState(false);

  const handleSignOut = () => {
    signOut(auth);
  };
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <div>
      <div>
        <header aria-label="Site Header" className="w-full ">
          <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between sm:px-6 lg:px-8 ">
            <div className="flex items-center gap-4 ">
              <Link href="/">
                <Image src={logo} width={50} alt="logo"></Image>
              </Link>
            </div>

            <div className="flex flex-1 items-center justify-end gap-8">
              <nav
                aria-label="Site Nav"
                className="hidden lg:flex lg:gap-4 lg:text-xs lg:font-bold lg:uppercase lg:tracking-wide  "
              >
                <Link
                  href="/"
                  className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current "
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current "
                >
                  Products
                </Link>
                {user && (
                  <Link
                    href="/dashboard"
                    className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current "
                  >
                    Dashboard
                  </Link>
                )}

                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current"
                  >
                    LOGOUT
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current "
                  >
                    Login / Register
                  </Link>
                )}

                <Button
                  variant="outlined"
                  onClick={() => {
                    setMode(mode === "light" ? "dark" : "light");
                  }}
                >
                  {mode === "light" ? "Turn dark" : "Turn light"}
                </Button>
                

             

                <div>
                  <Sidebar visible={visible} onHide={() => setVisible(false)}>
                    <MobileMenu />
                  </Sidebar>
                </div>
              </nav>
              <div className="lg:hidden md:block">
                <p icon="pi pi-arrow-right " onClick={() => setVisible(true)}>
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6h16M4 12h16M4 18h16"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </p>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
