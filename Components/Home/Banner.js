import React from "react";

export default function Banner() {
  return (
    <div>
      <div>
        <section className="bg-[url(https://i.ibb.co/w0WFXtx/Banner1.jpg)] bg-cover bg-center bg-no-repeat">
          <div className=" mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
            <div className="max-w-xl ltr:sm:text-left rtl:sm:text-right">
              <h1 className="text-3xl font-extrabold sm:text-5xl">
                Let us find your
                <strong className="block font-extrabold text-rose-700">
                  Forever Home.
                </strong>
              </h1>
              <p className="mt-4 max-w-lg sm:text-xl/relaxed">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Nesciunt illo tenetur fuga ducimus numquam ea!
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-center">
                <a
                  href="#"
                  className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                >
                  Get Started
                </a>

                <a
                  href="#"
                  className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
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
