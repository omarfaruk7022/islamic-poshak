import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo-light.svg";
import Image from "next/image";
import Link from "next/link";
import auth from "@/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import ThemeToggler from "../Dashboard/ThemeToggler";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Common/Loading";
import { Sidebar } from "primereact/sidebar";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Cart from "./Cart";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const [visibleRight, setVisibleRight] = useState(false);

  const email = user?.email;
  const handleSignOut = () => {
    signOut(auth);
  };

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(
        `https://easy-plum-caridea-tie.cyclic.app/api/users/email/${email}`
      ).then((res) => res.json()),
  });
  const refetch = () => {
    usersQuery.refetch();
  };
  const userInfo = usersQuery.data?.data[0];
  useEffect(() => {
    if (!userInfo) {
      refetch();
    }
  });

  return (
    <div>
      <div>
        <header
          aria-label="Site Header  "
          className="w-full bg-white shadow-lg dark:bg-[#001C30] fixed top-0 left-0 right-0 "
        >
          <div className="mx-auto flex h-24 max-w-screen-2xl items-center justify-between sm:px-6 lg:px-8  ">
            <div className="flex items-center gap-4 ">
              <button type="button" className="p-2 lg:hidden">
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

              <Link href="/">
                <Image src={logo} width={50} alt="logo" priority></Image>
              </Link>
            </div>

            <div className="flex flex-1 items-center justify-end gap-8 ">
              <nav
                aria-label="Site Nav"
                className="hidden lg:flex lg:gap-4 lg:text-xs lg:font-bold lg:uppercase lg:tracking-wide lg:text-gray-700 dark:text-gray-300"
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

                <div class="flex flex-1 items-center justify-between gap-8 sm:justify-end">
                  <div class="flex gap-4">
                    <div className="bg-white dark:bg-[#263449] hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400 m-auto dark:rounded-md">
                      <ThemeToggler />
                    </div>

                    <Link
                      href="#"
                      class="block shrink-0 rounded-lg  p-2.5 text-gray-600 shadow-sm hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400"
                    >
                      <span class="sr-only">Academy</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        />
                      </svg>
                    </Link>
                  </div>

                  {user && (
                    <>
                      <div className=" ">
                        <button
                          icon="pi pi-arrow-left"
                          className="bg-white dark:bg-[#263449] transition-all p-2 rounded-md shadow-md"
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
                      <button
                        type="button"
                        class="group flex shrink-0 items-center rounded-lg transition"
                      >
                        <Image
                          alt="profile"
                          width={40}
                          height={30}
                          src={userInfo?.profilePhoto}
                          class="h-10 w-10 rounded-full object-cover"
                        />

                        <p class="ms-2 hidden text-left text-xs sm:block">
                          <strong class="block font-medium">
                            {userInfo?.username}
                          </strong>

                          <span class="text-gray-500">{email}</span>
                        </p>
                      </button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
