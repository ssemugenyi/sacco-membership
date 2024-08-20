import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCategoryCard = ({ category }: { category: any }) => {
  const navigate = useNavigate();
  return (
    <div
      className="group flex flex-col justify-center items-center gap-0 w-[100px] cursor-pointer"
      onClick={() => {
        navigate(`../categories/${category.docId}`);
      }}
    >
      <img
        src={category?.image}
        alt="This a sacco category"
        className="w-full h-[80px] rounded-md"
      />
      <h3 className="font-semibold group-hover:text-primary">
        {category?.name}
      </h3>
    </div>
  );
};

export default ProductCategoryCard;
