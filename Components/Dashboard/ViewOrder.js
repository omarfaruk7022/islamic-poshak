import auth from "@/firebase.init";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import Loading from "../Common/Loading";

export default function ViewOrder({
  visible,
  setVisible,
  id,
  refetch,
  orderData,
  loadingData,
}) {
  const [order, setOrder] = useState(orderData);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   fetch(`https://frantic-crab-cape.cyclic.app/api/order/${id}`)
  //     .then((res) => res.json())
  //     .then((json) => setOrder(json?.data));
  // }, [id]);

  // const getOrderById = async () => {
  //   const response = await fetch(`https://frantic-crab-cape.cyclic.app/api/order/${id}`);
  //   const data = await response.json();
  //   setOrder(data?.data);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   getOrderById();
  // }, []);
  const handleHide = () => {
    setVisible(false);
    setOrder(null);
    refetch();
  };

  return (
    <div>
      <>
        <div>
          <Dialog
            visible={visible}
            onHide={() => handleHide()}
            style={{ width: "50vw" }}
            breakpoints={{ "960px": "75vw", "641px": "100vw" }}
          >
            {loadingData ? (
              <Loading />
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                  <div>
                    <img
                      src={order?.image}
                      alt=""
                      className="w-[250px] h-[100%]"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm">Name : {order?.name}</p>
                    <p className="text-sm">Price : {order?.price} ৳</p>
                    <p className="text-sm">Quantity : {order?.quantity}</p>
                    <p className="text-sm">User Email: {order?.email}</p>
                    <p className="text-sm">Order Date: {order?.orderDate}</p>
                    <p className="text-sm">Order Time: {order?.orderTime}</p>
                    <p className="text-sm">
                      Order status : {order?.orderStatus}{" "}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Dialog>
        </div>
      </>
    </div>
  );
}
