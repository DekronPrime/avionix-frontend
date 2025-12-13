"use client";

import { cn } from "@/src/utils/cn";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Arrow from "@/public/icons/arrow-down-light.png";
import Filter from "@/public/icons/filter-light.png";
import { DropdownItem } from "./DropdownItem";

type StatusFilterProps = {
  value: string;
  onChange: (val: string) => void;
  statuses: string[];
};

export const StatusFilter: React.FC<StatusFilterProps> = ({
  value,
  onChange,
  statuses,
}: StatusFilterProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentLabel = value === "ALL" ? "All Statuses" : value;

  return (
    <div ref={ref} className="relative h-full">
      <div
        className="flex items-center justify-between w-[300px] h-full gap-2 rounded-md px-3 py-2 bg-dark cursor-pointer select-none"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Image
          src={Filter}
          alt="filter"
          width={24}
          height={24}
          draggable={false}
        />

        <span className="text-white uppercase font-bold text-xl">
          {currentLabel}
        </span>

        <Image
          src={Arrow}
          alt="arrow"
          width={22}
          height={22}
          draggable={false}
          className={cn(
            "transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </div>

      {open && (
        <div
          className={cn(
            "absolute left-0 top-14 w-full bg-dark rounded-md shadow-lg z-40 border border-gray-700"
          )}
        >
          <div className="flex flex-col py-1">
            <DropdownItem
              label="All Statuses"
              active={value === "ALL"}
              onClick={() => {
                onChange("ALL");
                setOpen(false);
              }}
            />

            {statuses.map((s) => (
              <DropdownItem
                key={s}
                label={s}
                active={value === s}
                onClick={() => {
                  onChange(s);
                  setOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
