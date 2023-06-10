import React from "react";
import { BallTriangle } from "react-loader-spinner";

export default function Loading() {
  return (
    <div>
      <div className=" flex justify-center">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </div>
    </div>
  );
}
