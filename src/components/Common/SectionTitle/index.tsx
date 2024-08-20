import React from "react";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex gap-2 mb-6 ">
      <h3 className="font-poppins font-semibold capitalize text-[16px] text-textColor">
        {title}
      </h3>
    </div>
  );
};

export default SectionTitle;
