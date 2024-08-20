import React, { type ReactNode } from "react";

interface CHIPPROPS {
  children: ReactNode;
  bgColor?: string;
  textColor?: string;
  className?: string;
  variant?: "outlined" | "filled" | "text";
}

const GGChip = ({
  children,
  bgColor = "",
  textColor = "",
  className,
  variant,
}: CHIPPROPS) => {
  const variableClasses = () => {
    if (variant === "outlined") {
      return `border border-solid border-linear text-linear group-hover:bg-linear group-hover:text-white transition-all duration-300`;
    }
    return `${bgColor} ${textColor}`;
  };

  return (
    <div
      className={`${className} ${bgColor} ${textColor} relative flex w-fit select-none items-center justify-center whitespace-nowrap rounded-full ${variableClasses()} py-1 px-2 font-poppins text-xs font-bold capitalize`}
    >
      {children}
    </div>
  );
};

export default GGChip;
