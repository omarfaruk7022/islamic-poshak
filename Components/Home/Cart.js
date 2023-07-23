import auth from "@/firebase.init";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [user] = useAuthState(auth);
  const email = user?.email;

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: () =>
      fetch(`http://localhost:5000/api/cart/${email}`).then((res) =>
        res.json()
      ),
  });
  const refetch = () => {
    cartQuery.refetch();
  };
  const cartProducts = cartQuery.data?.data[0];
  useEffect(() => {
    if (!cartProducts) {
      refetch();
    }
  });

    const name = cartProducts?.name;
    const price = cartProducts?.price;
    const productId = cartProducts?.productId;
    const quantity = cartProducts?.quantity;
    const orderDate = cartProducts?.orderDate;
    const deliveryAddress = cartProducts?.deliveryAddress;
    const image = cartProducts?.image;
  


  return (
    <div>
      <p>Product Name</p>
      <h4>{name}</h4>
      <p>Product Price</p>
      <h4>{price}</h4>
      <p>Product ID </p>
      <h4>{productId}</h4>
      <p>Quantity </p>
      <h4>{quantity}</h4>
      <p>Order Date </p>
      <h4>{orderDate}</h4>
      <p>Delivery Address </p>
      <h4>{deliveryAddress}</h4>
      <p>Email </p>
      <h4>{email}</h4>
      <p>Image </p>
      <Image width={200} height={200} src={image} alt="" />
    </div>
  );
}
