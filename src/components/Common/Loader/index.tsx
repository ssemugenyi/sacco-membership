import React from "react";
import "./Loader.css";

interface LoaderProps {
  showText?: boolean;
}

const Loader = ({ showText = false }: LoaderProps) => (
  <div className="flex justify-center flex-col items-center gap-3">
    <div className="loader">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
    {showText && <h1>Please wait...</h1>}
  </div>
);

export default Loader;
