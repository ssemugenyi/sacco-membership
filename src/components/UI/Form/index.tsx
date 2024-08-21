import React, { type ReactNode } from "react";
import Logo from "../../../assets/images/221-logo.jpg";
interface FormProps {
  title?: string;
  description?: string;
  children: ReactNode;
  onSubmit?: () => void;
}

const Form = ({ title, description, children, onSubmit }: FormProps) => {
  return (
    <form
      className="px-2 max-sm:p-6 rounded-xl bg-white md:max-md:bg-primary group w-full max-w-2xl mx-auto"
      onSubmit={onSubmit}
      noValidate
    >
      <div className="flex items-center justify-center sm:hidden"></div>
      <div className="flex items-center justify-center w-full">
        <img src={Logo} alt="212 logo" className="w-32 h-32" />
      </div>
      <div className="text-center mb-4">
        <h1 className="font-poppins font-bold text-2xl text-textColor capitalize mb-2">
          {title}
        </h1>
        <p className="font-poppins font-medium text-sm">{description}</p>
      </div>
      {children}
    </form>
  );
};

export default Form;
