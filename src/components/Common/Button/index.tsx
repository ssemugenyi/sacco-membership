import React, { type FC } from "react";
import { RiLoader4Line } from "react-icons/ri";
import { createClassName } from "../../../utils";

interface ButtonProps {
  variant: "primary" | "secondary" | "textual" | "red" | "default";
  loading?: boolean | undefined;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  hideContentOnLoading?: boolean;
  disabled?: boolean;
}

const Button: FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  const {
    variant,
    loading,
    buttonRef,
    hideContentOnLoading,
    ...filteredProps
  } = props;

  return (
    <button
      ref={buttonRef}
      {...filteredProps}
      disabled={props.disabled || props.loading}
      className={createClassName(filteredProps, [
        // Layout
        `flex items-center justify-center w-fit gap-2 min-h-[32px] shadow border border-primary/10 transition-all rounded-md px-2 py-1 text-sm whitespace-nowrap`,
        // html states
        `disabled:opacity-50 disabled:cursor-not-allowed`,
        // Variants
        variant === "primary"
          ? // Primary
            "bg-linear shadow-linear/10 text-white hover:brightness-125 active:brightness-100 rounded-full"
          : variant === "secondary"
          ? // Secondary
            "bg-white shadow-primary/10 text-primary/50 hover:brightness-95 active:brightness-90"
          : variant === "red"
          ? // red
            "bg-signal-error bg-signal-error/10 text-red-500 hover:brightness-95 active:brightness-100"
          : variant === "default"
          ? "bg-white shadow-navy/10 text-navy/50 hover:brightness-95 active:brightness-90"
          : // Textual
            "bg-transparent hover:text-primary/50 !shadow-none border-none min-h-0 p-0",
        // Loading
        props.loading ? "cursor-wait" : "",
      ])}
    >
      {props.loading && <RiLoader4Line className="animate-spin" />}
      {props.loading && props.hideContentOnLoading ? null : props.children}
    </button>
  );
};

export default Button;
