import React from "react";

const GGProgressbar = ({ progress }: { progress: number }) => {
  return (
    <div className="w-full h-6 bg-gray rounded-full dark:bg-gray-700">
      <div
        className="h-6 bg-yellow rounded-full "
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default GGProgressbar;
