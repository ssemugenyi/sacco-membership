import React, { type ReactNode } from "react";
import { RiLoader4Line } from "react-icons/ri";

interface ButtonProps {
  type: "submit" | "reset" | "button" | undefined;
  children: ReactNode;
  width?: string;
  onClick?: () => void;
  disable?: boolean;
  variant?: "primary" | "secondary" | "outlined";
  loading?: boolean;
}

const GGButton = ({
  type,
  children,
  width,
  onClick,
  disable,
  variant = "primary",
  loading,
}: ButtonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-primary text-white hover:bg-primary/70 hover:brightness-125 ";
      case "secondary":
        return "bg-white text-primary border border-primary";
      case "outlined":
        return "bg-transparent text-primary border border-primary hover:bg-primary/70 hover:text-white hover:border-transparent";
      default:
        return "bg-primary text-white";
    }
  };
  return (
    <button
      style={{ width }}
      type={type}
      disabled={disable || loading}
      onClick={onClick}
      className={`flex items-center justify-center group-invalid:pointer-events-none w-auto group-invalid:opacity-30 bg-primary transition-all duration-300 ease-in-out hover:bg-primary/70 hover:brightness-125 rounded-full px-4 max-lg:px-3 py-1 hover:text-white font-poppins my-2 disabled:cursor-not-allowed disabled:bg-primary/70 ${getVariantStyles()}`}
    >
      {loading ? <RiLoader4Line className="animate-spin text-lg" /> : children}
    </button>
  );
};

export default GGButton;
