import React from "react";
import { Outlet } from "react-router-dom";

const Authentication = () => {
  return (
    <div className="mt-10">
      <Outlet />
    </div>
  );
};

export default Authentication;
