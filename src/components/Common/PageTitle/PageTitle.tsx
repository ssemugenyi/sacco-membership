import React from "react";
import BreadCrumb from "../BreadCrumb";

const PageTitle = () => (
  <div className="no-hover flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-4 mb-5">
    <h2 className="font-bold font-poppins text-lg capitalize leading-4 text-textColor ">
      <div className="text-poppins text-sm">
        <BreadCrumb />
      </div>
    </h2>
  </div>
);

export default PageTitle;
