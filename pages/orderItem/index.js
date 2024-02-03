import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FaToolbox } from "react-icons/fa";

import CartItem from "@/Components/Cart/CartItem";
import DeliveryAddress from "@/Components/Cart/DeliveryAddress";
import OrderConfirmation from "@/Components/Cart/OrderConfirmation";

export default function OrderItem() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div>
      <div class="  lg:mt-0">
        <div className="flex justify-center lg:justify-normal gap-5 bg-white dark:bg-[#111111] p-8 rounded-2xl ">
          <nav class="flex space-x-2" aria-label="Tabs" role="tablist">
            <div
              id="tabs-with-underline-item-1"
              data-hs-tab="#tabs-with-underline-1"
              aria-controls="tabs-with-underline-1"
              role="tab"
              className={`cursor-pointer bg-[#F3F6F6] dark:bg-[#1D1D1D] rounded-2xl p-2 text-center w-20 h-20 hover:bg-gradient-to-l to-[#23CE6B] from-[#286e45] hover:text-white active ${
                activeTab == 1
                  ? "bg-gradient-to-l to-[#23CE6B] from-[#286e45]"
                  : ""
              }`}
              onClick={() => setActiveTab(1)}
            >
              <p className={`mt-3 ${activeTab == 1 ? "text-white" : ""}`}>
                <span className=" flex justify-center text-xl">
                  <AiOutlineUser />{" "}
                </span>
                <span className=" flex justify-center">Cart Item</span>
              </p>
            </div>
            <div
              id="tabs-with-underline-item-2"
              data-hs-tab="#tabs-with-underline-2"
              aria-controls="tabs-with-underline-2"
              role="tab"
              className={`cursor-pointer bg-[#F3F6F6] dark:bg-[#1D1D1D] rounded-2xl p-2 text-center w-20 h-20 hover:bg-gradient-to-l to-[#23CE6B] from-[#286e45] hover:text-white active ${
                activeTab == 2
                  ? "bg-gradient-to-l to-[#23CE6B] from-[#286e45]"
                  : ""
              }`}
              onClick={() => setActiveTab(2)}
            >
              <p className={`mt-3 ${activeTab == 2 ? "text-white" : ""}`}>
                {" "}
                <span className=" flex justify-center text-xl">
                  <HiOutlineDocumentText />{" "}
                </span>
                <span className=" flex justify-center">Delivery address</span>
              </p>
            </div>
            <div
              id="tabs-with-underline-item-3"
              data-hs-tab="#tabs-with-underline-3"
              aria-controls="tabs-with-underline-3"
              role="tab"
              className={`cursor-pointer bg-[#F3F6F6] dark:bg-[#1D1D1D] rounded-2xl p-2 text-center w-20 h-20 hover:bg-gradient-to-l to-[#23CE6B] from-[#286e45] hover:text-white active ${
                activeTab == 3
                  ? "bg-gradient-to-l to-[#23CE6B] from-[#286e45]"
                  : ""
              }`}
              onClick={() => setActiveTab(3)}
            >
              <p className={`mt-3 ${activeTab == 3 ? "text-white" : ""}`}>
                {" "}
                <span className=" flex justify-center text-xl">
                  <FaToolbox />{" "}
                </span>
                <span className=" flex justify-center">Order </span>
              </p>
            </div>
          </nav>
        </div>
      </div>

      <div class="mt-3">
        <div
          id="tabs-with-underline-1"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-1"
        >
          <CartItem />
        </div>
        <div
          id="tabs-with-underline-2"
          class="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-2"
        >
          <DeliveryAddress />
        </div>
        <div
          id="tabs-with-underline-3"
          class="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-3"
        >
          <OrderConfirmation />
        </div>
      </div>
    </div>
  );
}
