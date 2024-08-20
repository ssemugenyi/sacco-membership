import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";

const OnBoardPreview = ({
  title,
  description,
  image,
  onEdit,
  onDelete,
  showActions,
  bgColor,
}: {
  title: string;
  description: string;
  image: string;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions: boolean;
  bgColor?: string;
}) => {
  return (
    <div
      className={`h-[500px] w-[250px] rounded-b-2xl overflow-hidden group cursor-pointer bg-linear relative max-sm:w-full ${showActions ? "" : "pointer-events-none select-none"}`}
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div
        style={{
          backgroundColor: "transparent",
          borderBottomLeftRadius: "150px",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${image})`,
        }}
        className="h-[70%] w-full flex items-center justify-center"
      ></div>
      <div className="flex items-center justify-center flex-col gap-2 mt-3 p-4">
        <h4 className="font-semibold text-md text-white font-poppins">
          {title}
        </h4>
        <p className="text-white font-normal text-sm font-poppins text-center">
          {description}
        </p>
      </div>
      {showActions && (
        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 absolute top-1 right-1">
          <button
            onClick={onEdit}
            title="Edit"
            className="bg-white hover:bg-white/80 text-primary font-semibold text-sm p-2 rounded-full"
          >
            <AiOutlineEdit />
          </button>

          <button
            onClick={onDelete}
            title="Delete"
            className="bg-white hover:bg-white/80 text-primary font-semibold text-sm p-2 rounded-full"
          >
            <BiTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default OnBoardPreview;
