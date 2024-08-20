import React, { type FC, Fragment, useEffect, useRef } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { createClassName } from "../../../utils";

const Modal: FC<{
  title?: string;
  open?: boolean;
  actions?: JSX.Element;
  body?: JSX.Element;
  icon?: JSX.Element;
  setOpen?: (open: boolean) => void;
  split?: boolean;
  center?: boolean;
  canNotClose?: boolean;
}> = (props) => {
  const { title, open, canNotClose, body, split, center, setOpen } = props;
  const dummyRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      // focus the button so that the user can close the modal with the escape key
      dummyRef.current?.focus();
    }
  }, [open]);

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30"
        static
        onClose={canNotClose ? () => {} : setOpen || (() => {})}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 transition-all" />
        </TransitionChild>

        <div className="fixed inset-0 z-30 overflow-y-auto">
          <div
            className={`flex min-h-full ${
              center ? "items-center" : "items-start"
            } justify-center p-4 text-center sm:p-8 !w-full`}
          >
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                className={createClassName({}, [
                  "relative transform rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all w-full md:max-w-lg sm:p-6",
                  split
                    ? "md:max-w-[1200px] md:min-w-[700px] lg:min-w-[950px]"
                    : "md:max-w-lg",
                ])}
              >
                {title && <DialogTitle as="h2">{title}</DialogTitle>}
                {body && body}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
