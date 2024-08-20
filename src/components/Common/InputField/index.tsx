import React, { type FC } from "react";
import { Field, type FieldProps } from "formik";

interface OptionProps {
  value: string;
  label: string;
}

interface InputProps {
  name: string;
  placeholder?: string;
  type?: string;
  label?: string;
  disabled?: boolean;
  rows?: number;
  customClass?: string;
  note?: string;
  validate?: any;
  handlePasswordVisibility?: (name: string) => void;
  showEye?: boolean;
  [x: string]: any;
  field?: any;
  values?: any;
  setFieldValue?: any;
  options?: OptionProps[];
  customOnChange?: (e: any) => void;
  className?: string;
  prepend?: any;
  append?: any;
  prependClick?: (name: string) => void;
  appendClick?: (name: string) => void;
  selectLabel?: string;
}

const InputType: FC<InputProps> = ({
  field,
  type,
  values,
  name,
  setFieldValue,
  placeholder,
  options,
  disabled,
  customOnChange,
  rows,
  className,
  handlePasswordVisibility,
  showEye,
  ...props
}) => {
  switch (type) {
    case "textarea":
      return (
        <textarea
          disabled={disabled}
          placeholder={placeholder}
          value={values[name]}
          rows={rows}
          {...field}
          className={`${className} rounded-md`}
        />
      );

    case "checkbox":
      return (
        <input
          disabled={disabled}
          placeholder={placeholder}
          value={values[name]}
          type="checkbox"
          {...field}
          className={`${className} rounded-md`}
        />
      );
    case "select":
      return (
        <select
          disabled={disabled}
          value={values[name]}
          onChange={(e) => {
            setFieldValue(name, e.target.value);
            if (customOnChange) {
              customOnChange(e);
            }
          }}
          className=" bg-[#f5f8fa] box-border border border-[#cbd6e2]  py-[6.5px] px-3 text-gray-700 leading-tight focus:outline-none mt-2 capitalize rounded-md"
          {...field}
        >
          <option value="">Select {props.selectLabel}</option>
          {options?.map((option: OptionProps) => (
            <option
              value={option?.value}
              key={option?.value}
              className="capitalize"
            >
              {option?.label}
            </option>
          ))}
        </select>
      );
    default:
      return (
        <div className="flex items-center w-full">
          {props.prepend && (
            <button
              type="button"
              className={`prepend-btn bg-[#f5f8fa] box-border border border-solid border-[#cbd6e2] select-none text-gray-700 leading-tight mt-2 text-sm ${props.prependClick ? "cursor-pointer" : "cursor-auto"}`}
              onClick={() => props.prependClick?.(name)}
            >
              {props.prepend}
            </button>
          )}
          <input
            {...field}
            className={`${className} ${props.prepend ? "prepend-input" : ""} ${props.append ? "append-input" : ""}`}
            placeholder={placeholder}
            value={values[name]}
            type={type}
            disabled={disabled}
            {...props}
          />
          {props.append && (
            <button
              type="button"
              className={`append-btn bg-[#f5f8fa] box-border border border-solid border-[#cbd6e2] select-none text-gray-700 leading-tight mt-2 text-sm ${props.appendClick ? "cursor-pointer" : "cursor-auto"}`}
              onClick={() => {
                props.appendClick?.(name);
              }}
            >
              {props.append}
            </button>
          )}
        </div>
      );
  }
};

const Input: FC<InputProps> = ({
  name,
  placeholder,
  type,
  label,
  disabled,
  rows,
  customClass,
  note,
  validate,
  showEye,
  handlePasswordVisibility,
  ...props
}) => (
  <Field name={name} validate={validate}>
    {({ field, meta, form: { values, setFieldValue } }: FieldProps) => (
      <div className="flex flex-col w-full mt-2">
        {label ? (
          <label htmlFor={name} className="field-label text-textColor">
            {label}{" "}
            {note && (
              <span
                className="text-muted"
                style={{
                  fontSize: "10px",
                }}
              >
                ({note})
              </span>
            )}
          </label>
        ) : null}

        <InputType
          type={type}
          field={field}
          values={values}
          name={name}
          setFieldValue={setFieldValue}
          placeholder={placeholder}
          disabled={disabled}
          showEye={showEye}
          handlePasswordVisibility={handlePasswordVisibility}
          rows={rows}
          {...props}
          className={`w-full appearance-none rounded-md bg-[#f5f8fa] box-border border border-[#cbd6e2] py-2 px-3 text-gray-700 leading-tight focus:outline-none mt-2 ${
            customClass ?? ""
          } ${
            (meta.touched && meta.error) || props.isError
              ? " invalid-field focus:border-secondary border-secondary"
              : " focus:border-primary border-[#cbd6e2]"
          } ${showEye ? "dav-input-eye" : ""} disabled:bg-[#fafafa] disabled:cursor-not-allowed`}
        />

        {meta.touched && meta.error && (
          <div
            style={{ color: "#d32f2f", fontSize: "12px", paddingLeft: 3 }}
            className="font-poppins pt-1 font-semibold"
          >
            {meta.error}
          </div>
        )}
      </div>
    )}
  </Field>
);

export default Input;
