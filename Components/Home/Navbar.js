import React from "react";
import logo from "../../assets/images/logo-light.svg";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <div>
        <header aria-label="Site Header" className="w-full absolute">
          <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between sm:px-6 lg:px-8 ">
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

              <a href="#">
                <Image src={logo} width={50} alt="logo" priority></Image>
              </a>
            </div>

            <div className="flex flex-1 items-center justify-end gap-8">
              <nav
                aria-label="Site Nav"
                className="hidden lg:flex lg:gap-4 lg:text-xs lg:font-bold lg:uppercase lg:tracking-wide lg:text-gray-700"
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

                <Link
                  href="/login"
                  className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current "
                >
                  Login
                </Link>

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
              </nav>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
