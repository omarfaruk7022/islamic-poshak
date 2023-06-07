import React from "react";
import logo from "../../assets/images/logo-light.svg";
import Image from "next/image";
import Link from "next/link";

export default function NavbarOther() {
  return (
    <div>
      <div>
        <header aria-label="Site Header" class="w-full ">
          <div class="mx-auto flex h-16 max-w-screen-2xl items-center justify-between sm:px-6 lg:px-8 ">
            <div class="flex items-center gap-4 ">
              <button type="button" class="p-2 lg:hidden">
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <a href="#">
                <Image src={logo} width={50} alt="logo"></Image>
              </a>
            </div>

            <div class="flex flex-1 items-center justify-end gap-8">
              <nav
                aria-label="Site Nav"
                class="hidden lg:flex lg:gap-4 lg:text-xs lg:font-bold lg:uppercase lg:tracking-wide lg:text-white"
              >
                <Link
                  href="/"
                  class="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current "
                >
                  Home
                </Link>

                

                <a
                  href="/login"
                  class="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current "
                >
                  Login
                </a>

                <a
                  href="/profile"
                  class="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current"
                >
                  Profile
                </a>
                <a
                  href="/contact"
                  class="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current"
                >
                  Contact
                </a>
              </nav>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
