import React, { useState } from "react";
import logo from "../../assets/images/logo-light.svg";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "@/firebase.init";
import { signOut } from "firebase/auth";
import { Sidebar } from "primereact/sidebar";
import MobileMenu from "../Dashboard/MobileMenu";

export default function NavbarOther() {
  const [user] = useAuthState(auth);
  const [visible, setVisible] = useState(false);

  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <div>
      <div>
        <header aria-label="Site Header" className="w-full ">
          <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between sm:px-6 lg:px-8 ">
            <div className="flex items-center gap-4 ">
            <div class="lg:hidden md:block">
                  <p icon="pi pi-arrow-right " onClick={() => setVisible(true)}>
                    <svg
                      aria-hidden="true"
                      class="h-5 w-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewbox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 6h16M4 12h16M4 18h16"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                    </svg>
                  </p>
                </div>

              <a href="#">
                <Image src={logo} width={50} alt="logo"></Image>
              </a>
            </div>

            <div className="flex flex-1 items-center justify-end gap-8">
              <nav
                aria-label="Site Nav"
                className="hidden lg:flex lg:gap-4 lg:text-xs lg:font-bold lg:uppercase lg:tracking-wide lg:text-white"
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
                    href="/dashboard/dashboardHome"
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

                <Link
                  href="/profile"
                  className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current"
                >
                  Profile
                </Link>
                <Link
                  href="/contact"
                  className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current"
                >
                  Contact
                </Link>
                
                <div>
                  <Sidebar visible={visible} onHide={() => setVisible(false)}>
                    <MobileMenu />
                  </Sidebar>
                </div>
              </nav>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
