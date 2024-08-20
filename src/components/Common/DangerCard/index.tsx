import React, { type FC } from "react";
import { createClassName } from "../../../utils";
import { DivProps } from "../../../interfaces";

const DangerCard: FC<
  {
    label: string | number;
    action?: JSX.Element;
  } & DivProps
> = (props) => {
  const { label, action, ...filteredProps } = props;

  return (
    <div
      className={createClassName({ className: filteredProps?.className }, [
        "card",
      ])}
    >
      <div
        {...filteredProps}
        className="flex gap-4 justify-between items-center p-2 rounded-md border bg-red-500/10 border-red-500/10 shadow shadow-red-500/10"
      >
        <p className={createClassName({}, ["text-red-700"])}>{label}</p>

        {action}
      </div>
    </div>
  );
};

export default DangerCard;
