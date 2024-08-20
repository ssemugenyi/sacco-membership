import React from "react";

interface DeleteProps {
  show: boolean;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  itemName?: string;
  actionName: string;
  showMessage?: boolean;
  messagePlaceholder?: string;
  messageHandler?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const DeleteDialog = ({
  show,
  onConfirm,
  onCancel,
  isLoading,
  itemName,
  actionName,
  showMessage,
  messageHandler,
  messagePlaceholder,
}: DeleteProps) => {
  return (
    <div
      className={`bg-[#000]/50 w-full  h-screen absolute z-[99] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${!show ? "hidden" : ""}`}
      onClick={onCancel}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-white w-11/12 md:w-[400px] max-w-[400px] max-h-[85vh] rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 shadow-md"
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold font-poppins capitalize">
            {actionName} {itemName}
          </h1>
          <p className="text-sm mt-2 font-poppins">
            Are you sure you want to {actionName} this {itemName ?? "item"}?
            This action is permanent and can not be undone.
          </p>
        </div>
        {showMessage && (
          <div className="p-4">
            <textarea
              rows={2}
              onChange={messageHandler}
              className="w-full h-24 border border-gray-300 rounded-md p-2 font-poppins focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder={messagePlaceholder ?? "Enter message"}
            ></textarea>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-between mt-4 px-5 ">
          <button
            disabled={isLoading}
            onClick={onCancel}
            className="w-full  bg-primaryLight/20 text-primary font-semibold hover:bg-primaryLight px-4 py-2 rounded-md font-poppins disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full border bg-primary text-white capitalize font-semibold hover:bg-primary/80  transition-all duration-300 px-4 py-2 rounded-md font-poppins disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ?? false ? `${actionName}...` : actionName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
