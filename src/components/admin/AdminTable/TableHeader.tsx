"use client";

import { Column } from "@/src/types/admin";
import Arrow from "@/public/icons/arrow-down-light.png";
import Image from "next/image";

type TableHeaderProps<T> = {
  columns: Column<T>[];
  onSort?: (field: keyof T) => void;
  sortField?: keyof T | string;
  sortDirection?: "asc" | "desc" | null;
};

export const TableHeader = <T extends object>({
  columns,
  onSort,
  sortField,
  sortDirection,
}: TableHeaderProps<T>) => {
  return (
    <thead className="rounded-t-md">
      <tr className="">
        {columns.map((col) => {
          const isActive = sortField === col.key;

          return (
            <th
              key={String(col.key)}
              style={{ width: col.width }}
              className={`first-of-type:rounded-tl-md first-of-type:pl-6 last-of-type:rounded-tr-md last-of-type:pr-6 px-3 py-4 text-left text-lg bg-dark text-white  text-centerfont-poppins font-semibold select-none ${
                col.sortable ? "cursor-pointer" : ""
              }`}
              onClick={() => col.sortable && onSort?.(col.key)}
            >
              <span
                className={`flex items-center gap-1 ${
                  col.align === "center"
                    ? "justify-center"
                    : col.align === "left"
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                {col.title}

                {col.sortable && (
                  <span>
                    {isActive ? (
                      sortDirection === "asc" ? (
                        <Image
                          src={Arrow}
                          alt="Arrow Down"
                          width={20}
                          height={20}
                          draggable={false}
                          className="rotate-0 transition-all"
                        />
                      ) : (
                        <Image
                          src={Arrow}
                          alt="Arrpw Up"
                          width={20}
                          height={20}
                          draggable={false}
                          className="rotate-180 transition-all"
                        />
                      )
                    ) : (
                      <Image
                        src={Arrow}
                        alt="Arrow Down"
                        width={20}
                        height={20}
                        draggable={false}
                        className="rotate-0 opacity-50 transition-all"
                      />
                    )}
                  </span>
                )}
              </span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
