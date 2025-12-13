import { cn } from "@/src/utils/cn";
import React from "react";

type DropdownItemProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

export const DropdownItem: React.FC<DropdownItemProps> = ({
  label,
  active,
  onClick,
}: DropdownItemProps) => {
  return (
    <>
      <div
        onClick={onClick}
        className={cn(
          "px-3 py-2 cursor-pointer text-lg uppercase transition-all",
          active
            ? "bg-light text-black font-semibold"
            : "hover:bg-light hover:text-black text-white"
        )}
      >
        {label}
      </div>
    </>
  );
};
