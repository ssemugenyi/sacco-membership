import React from "react";
import { FaUsers } from "react-icons/fa6";

const ReviewCard = () => {
  return (
    <div className="card flex flex-col justify-center md:items-center">
      <div className="bg-primary p-3 rounded text-white">
        <FaUsers />
      </div>
      <div className="mt-3 mb-1">
        <span className="relative font-poppins font-bold md:!text-[32px]">
          <span className="opacity-0">348</span>
          <span className="absolute left-0">348</span>
        </span>
      </div>
      <h6 className="font-poppins font-bold text-base ">
        Total <span className="xl:hidden 4xl:inline">Customers</span>
      </h6>
    </div>
  );
};

export default ReviewCard;
