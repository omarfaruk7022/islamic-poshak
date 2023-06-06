import React from "react";
import logo from "../../assets/images/logo-light.svg";
import Image from "next/image";

export default function Navbar() {
  return (
    <div>
      <div className="">
        <header aria-label="Site Header" class="w-full absolute">
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
                class="hidden lg:flex lg:gap-4 lg:text-xs lg:font-bold lg:uppercase lg:tracking-wide lg:text-black"
              >
                <a
                  href="/about"
                  class="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current "
                >
                  About
                </a>

                <a
                  href="/news"
                  class="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current "
                >
                  News
                </a>

                <a
                  href="/products"
                  class="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current "
                >
                  Products
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
      <div>
        <section class="bg-[url(https://i.ibb.co/S0K99V4/Banner1.jpg)] bg-cover bg-center bg-no-repeat">
          <div class=" mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
            <div class="max-w-xl ltr:sm:text-left rtl:sm:text-right">
              <h1 class="text-3xl font-extrabold sm:text-5xl">
                Let us find your
                <strong class="block font-extrabold text-rose-700">
                  Forever Home.
                </strong>
              </h1>
              <p class="mt-4 max-w-lg sm:text-xl/relaxed">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Nesciunt illo tenetur fuga ducimus numquam ea!
              </p>

              <div class="mt-8 flex flex-wrap gap-4 text-center">
                <a
                  href="#"
                  class="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                >
                  Get Started
                </a>

                <a
                  href="#"
                  class="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
