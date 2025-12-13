"use client";

import { cn } from "@/src/utils/cn";
import Image from "next/image";
import React, { useEffect } from "react";

import AddItem from "@/public/icons/add-item-light.png";
import Close from "@/public/icons/close-light.png";
import EditItem from "@/public/icons/edit-item-light.png";

type AdminModalWindowProps = {
  isOpen: boolean;
  type: "create" | "edit";
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  statusBar?: React.ReactNode;
  footer?: React.ReactNode;
};

export const AdminModalWindow: React.FC<AdminModalWindowProps> = ({
  isOpen,
  type = "create",
  onClose,
  title,
  children,
  statusBar,
  footer,
}: AdminModalWindowProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "w-3/5 max-h-[90vh] bg-white rounded-xl shadow-xl p-0 animate-fadeIn"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 rounded-t-lg border-b-[3px] bg-dark border-light">
          <div className="inline-flex items-center gap-3">
            <Image
              src={type === "create" ? AddItem : EditItem}
              alt="Type icon"
              width={30}
              height={30}
              draggable={false}
            />
            <h2 className="text-2xl font-bold font-poppins text-white">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:rotate-90 transition-all duration-200"
          >
            <Image
              src={Close}
              alt="X"
              width={20}
              height={20}
              draggable={false}
            />
          </button>
        </div>

        <div className="custom-scrollbar px-4 py-6 max-h-[70vh] bg-background">
          {children}
        </div>

        {statusBar && (
          <div className="px-4 py-1 bg-light border-t-[3px] border-light flex justify-between items-center">
            {statusBar}
          </div>
        )}

        {footer && (
          <div className="px-4 py-3 border-t-[3px] border-light rounded-b-lg bg-dark">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
