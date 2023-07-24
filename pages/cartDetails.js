import Loading from "@/Components/Common/Loading";
import ViewCart from "@/Components/Home/ViewCart";
import auth from "@/firebase.init";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function CartDetails() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    router.push("/login");
  }
  return (
    <div>
      <ViewCart />
    </div>
  );
}
