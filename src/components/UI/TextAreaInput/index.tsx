import React from "react";
import { type FormikErrors } from "formik";

interface InputProps {
  name: string;
  rows: number;
  value?: string | number;
  placeholder?: string;
  label?: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: React.FocusEvent<any, Element>) => void;
  required?: boolean;
  error?:
    | string
    | undefined
    | string[]
    | FormikErrors<any>
    | Array<FormikErrors<any>>
    | undefined;
}

const TextAreaInput = ({
  name,
  rows,
  label,
  onChange,
  onBlur,
  value,
  placeholder,
  required,
  error,
}: InputProps) => {
  return (
    <div>
      <label className="block relative">
        <span className="block field-label text-textColor capitalize">
          {label}
        </span>
        <textarea
          rows={rows ?? 3}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          className={`${error != null && "border-error text-error"} !h-[160px] !py-[15px] text-[#000] font-poppins mt-1 px-3  bg-white border shadow-sm border-[#E2E1E1] placeholder-slate-400 focus:outline-none focus:border-[#971B3F] focus:ring-[#971B3F] block w-full rounded-md sm:text-sm focus:ring-1 `}
        />
        <span className="mt-2  font-poppins text-sm text-error peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
          {error as React.ReactNode}
        </span>
      </label>
    </div>
  );
};

export default TextAreaInput;
