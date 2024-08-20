import React from "react";
import { Link, useLocation } from "react-router-dom";

interface BreadCrumbProps {
  lastName?: string;
}

const BreadCrumb = ({ lastName }: BreadCrumbProps) => {
  const location = useLocation();
  const { pathname } = location;
  const segments = pathname.split("/");

  let url = "";

  const breadcrumbLinks = segments
    .filter((segment) => segment !== "")
    .map((segment, index) => {
      url += `/${segment}`;
      if (index === segments.length - 2) {
        return (
          <div
            key={Math.random()}
            className="text-textColor font-medium capitalize"
          >
            {lastName ?? segment.replace(/-/g, " ")}
          </div>
        );
      }
      return (
        <div
          key={Math.random()}
          className="after:content-['>'] after:mx-1 after:text-textColor"
        >
          <Link
            to={url}
            key={index}
            className="text-primary font-medium capitalize"
          >
            {segment.replace(/-/g, " ")}
          </Link>
        </div>
      );
    });

  return (
    <div className="flex py-4 pl-2 text-xs md:text-sm font-poppins">
      {breadcrumbLinks}
    </div>
  );
};

export default BreadCrumb;
