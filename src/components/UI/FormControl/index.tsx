import React, { type ReactNode } from "react";

interface ControlProps {
  children: ReactNode;
}

const FormControl = ({ children }: ControlProps) => {
  return <div className="my-2 w-full">{children}</div>;
};

export default FormControl;
