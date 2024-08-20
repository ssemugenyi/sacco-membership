import { type FormikErrors } from "formik/dist/types";
import React, { useState } from "react";

interface InputProps {
  name: string;
  type: string;
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
const FormInput = ({
  name,
  type,
  label,
  onChange,
  onBlur,
  value,
  placeholder,
  required,
  error,
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <>
      <label className="block relative">
        <span className="block field-label text-textColor capitalize">
          {label}
        </span>
        <input
          type={isPasswordVisible ? "text" : type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          className={`${error != null && "border-error text-error"} text-[#000] font-poppins mt-1 px-3 py-2 bg-white border shadow-sm border-[#E2E1E1] placeholder-slate-400 focus:outline-none focus:border-[#971B3F] focus:ring-[#971B3F] block w-full rounded-md sm:text-sm focus:ring-1 `}
        />

        {type === "password" && (
          <button
            className="absolute top-[25px] bottom-0 right-0 flex items-center px-4 text-gray-600"
            onClick={() => {
              setIsPasswordVisible((Prev) => !Prev);
            }}
            type="button"
          >
            {isPasswordVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>
        )}
      </label>
      <span className="mt-2  font-poppins text-sm text-error peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
        {error as React.ReactNode}
      </span>
    </>
  );
};

export default FormInput;
