import React, { useEffect, useState } from "react";
import { FaRegImage } from "react-icons/fa";
import Button from "../Button";
import { RiDeleteBin5Fill } from "react-icons/ri";

const ImageUpload = ({
  imageUrl = "",
  fieldName,
  setFieldValue,
  label,
  note,
  clearImage,
}: {
  fieldName: string;
  setFieldValue: any;
  imageUrl?: string;
  label?: string;
  note?: string;
  clearImage?: boolean;
}) => {
  const [image, setImage] = useState<string>("");
  const onChangeHandler = (event: { target: any }) => {
    const imageLink = event.target.files[0]
      ? // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        URL.createObjectURL(event.target.files[0])
      : "";
    setImage(imageLink);
    setFieldValue(fieldName, event.target.files[0]);
  };
  const dragHandler = (event: {
    target: any;
    dataTransfer: any;
    preventDefault: () => void;
  }) => {
    event.preventDefault();
    event.target.files = event.dataTransfer.files;
  };
  const dropHandler = (event: { target: any; preventDefault: () => void }) => {
    event.preventDefault();
    onChangeHandler(event);
  };

  useEffect(() => {
    if (clearImage) {
      setImage("");
    }
  }, [clearImage]);

  const hasImage = image?.length > 0 || imageUrl?.length > 0;

  const onDelete = (e: any) => {
    e.stopPropagation();
    setImage("");
    setFieldValue(fieldName, null);
  };
  return (
    <div className="flex flex-col gap-2 w-full ">
      {label && (
        <span className="field-label text-textColor">
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
        </span>
      )}

      <label
        className="group media-dropzone 2xl:col-span-2 cursor-pointer relative"
        htmlFor={fieldName}
        style={{
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          backgroundImage: `url(${image || imageUrl})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
        id={`img-${Math.random()}`}
        onDrag={dragHandler}
        onDrop={dropHandler}
      >
        {hasImage && (
          <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 z-10">
            <Button
              type="button"
              variant="secondary"
              className="text-red-500"
              onClick={onDelete}
            >
              <RiDeleteBin5Fill />
            </Button>
          </div>
        )}
        <input
          accept="image/jpeg,image/png,image/gif,image/bmp,image/webp,image/svg+xml"
          type="file"
          id={fieldName}
          name={fieldName}
          hidden
          onChange={onChangeHandler}
        />
        <div
          className={`${
            hasImage
              ? "opacity-0 group-hover:opacity-100 group-hover:bg-white/30"
              : ""
          } p-2 flex flex-col items-center gap-2.5 rounded-sm`}
        >
          <FaRegImage className="text-[20px] text-[#AEAEAE]" />
          <p className="font-bold font-poppins text-sm text-primary">
            {hasImage ? "Change Image" : "Browse Image"}
          </p>
        </div>
      </label>
    </div>
  );
};

export default ImageUpload;
