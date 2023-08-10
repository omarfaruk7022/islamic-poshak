import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";

export default function Loading() {
  return (
    <div>
      <div className="flex justify-center items-center">
        <ProgressSpinner />
      </div>
    </div>
  );
}
