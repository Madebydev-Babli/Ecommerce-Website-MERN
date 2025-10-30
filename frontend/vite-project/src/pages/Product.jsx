import React from "react";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";

export default function Product() {
  return (
    <div className="w-full">
      <LatestCollection/>
      <BestSeller/>
    </div>
  );
}