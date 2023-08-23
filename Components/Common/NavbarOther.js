import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "@/firebase.init";
import { signOut } from "firebase/auth";
import { Sidebar } from "primereact/sidebar";
import MobileMenu from "../Dashboard/MobileMenu";
import ThemeToggler from "../Dashboard/ThemeToggler";
import Cart from "../Home/Cart";
import { AiOutlineShoppingCart } from "react-icons/ai";
import MobileNav from "../Home/MobileNav";

export default function NavbarOther() {
  const [user] = useAuthState(auth);
  const [visible, setVisible] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  const [visibleNav, setVisibleNav] = useState(false);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div>
      <div>
        <header
          aria-label="Site Header"
          className="w-full  shadow-lg dark:shadow-2xl  "
        >
          <div className="mx-auto flex h-24 max-w-screen-2xl items-center justify-between sm:px-6 lg:px-8 ">
            <div className="flex items-center gap-4 ">
              <button
                type="button"
                className="p-2 lg:hidden"
                onClick={() => setVisibleNav(true)}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div>
                <Sidebar
                  position="left"
                  visible={visibleNav}
                  onHide={() => setVisibleNav(false)}
                >
                  <MobileNav />
                </Sidebar>
              </div>

              <Link href="/">
                <Image src={logo} width={150} alt="logo" priority></Image>
              </Link>
            </div>

            <div className="flex flex-1 items-center justify-end ">
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

                {/* <div className=" m-auto bg-white dark:bg-black rounded-md">
                  <ThemeToggler />
                </div> */}

                <div>
                  <Sidebar
                    position="left"
                    visible={visibleNav}
                    onHide={() => setVisibleNav(false)}
                  >
                    <MobileNav />
                  </Sidebar>
                </div>
              </nav>

              <div className=" ">
                <button
                  icon="pi pi-arrow-left"
                  className="bg-white dark:bg-black  transition-all p-2 rounded-md shadow-md"
                  onClick={() => setVisibleRight(true)}
                >
                  <AiOutlineShoppingCart className="text-[20px] " />
                </button>
              </div>
              <div>
                <Sidebar
                  position="right"
                  visible={visibleRight}
                  onHide={() => setVisibleRight(false)}
                >
                  <Cart />
                </Sidebar>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
