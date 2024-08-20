import React from "react";
import { BiArrowFromRight } from "react-icons/bi";

const BackButton = ({
  buttonText,
  onClick,
}: {
  buttonText: string;
  onClick: () => void;
}) => {
  return (
    <div className="mb-3">
      <button
        type="button"
        onClick={onClick}
        className=" flex items-center gap-2 text-sm font-medium bg-primaryLight text-primary capitalize hover:bg-primary/20 px-4 py-1 rounded-full disabled:bg-[#fceff3] disabled:cursor-not-allowed"
      >
        <BiArrowFromRight />
        {buttonText}
      </button>
    </div>
  );
};

export default BackButton;
