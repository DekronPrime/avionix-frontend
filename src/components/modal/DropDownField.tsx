"use client";

import { cn } from "@/src/utils/cn";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import Arrow from "@/public/icons/arrow-down-dark.png";

type Option<T> = {
  value: T;
  label?: string;
  badge?: string;
};

type DropdownFieldProps<T> = {
  name: string;
  label: string;
  required?: boolean;
  options: Option<T>[];
  placeholder?: string;

  renderOption?: (opt: Option<T>, active: boolean) => React.ReactNode;
  renderValue?: (opt?: Option<T>) => React.ReactNode;

  className?: string;
};

export const DropdownField = <T,>({
  name,
  label,
  required,
  options,
  placeholder,
  renderOption,
  renderValue,
  className,
}: DropdownFieldProps<T>) => {
  const { control } = useFormContext();
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

  return (
    <div ref={ref} className={cn("flex flex-col gap-1 relative", className)}>
      <label className="text-sm font-semibold font-poppins text-black">
        {label}
        {required && "*"}
      </label>

      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          const selected = options.find((o) => o.value === field.value);

          return (
            <>
              <div
                className="flex items-center justify-between w-full bg-light rounded-lg border-l-[3px] border-foreground p-2.5 px-3 cursor-pointer
                           text-[16px] font-ptSerif font-bold text-black
                           hover:border-dark transition-all select-none"
                onClick={() => setOpen((prev) => !prev)}
              >
                <div className="text-black">
                  {selected ? (
                    renderValue ? (
                      renderValue(selected)
                    ) : (
                      selected.label
                    )
                  ) : (
                    <span className="text-black/50">{placeholder}</span>
                  )}
                </div>

                <Image
                  src={Arrow}
                  alt="arrow"
                  width={20}
                  height={20}
                  className={cn(
                    "transition-transform duration-200",
                    open && "rotate-180"
                  )}
                />
              </div>

              {open && (
                <div
                  className="
                    absolute left-0 top-[80%]
                    w-full bg-dark rounded-lg shadow-xl z-50 
                    max-h-60 overflow-y-auto border border-gray-500 animate-fadeIn
                  "
                >
                  {options.map((opt) => {
                    const active = opt.value === field.value;

                    return (
                      <div
                        key={String(opt.value)}
                        onClick={() => {
                          field.onChange(opt.value);
                          setOpen(false);
                        }}
                        className="cursor-pointer"
                      >
                        {renderOption ? (
                          renderOption(opt, active)
                        ) : (
                          <div
                            className={cn(
                              "px-3 py-2 text-lg capitalize text-white border-t border-gray-500",
                              active
                                ? "bg-foreground font-semibold"
                                : "hover:bg-foreground"
                            )}
                          >
                            {opt.label}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="min-h-[16px]">
                {fieldState.error && (
                  <p className="text-xs font-semibold font-inter text-left text-red-700">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            </>
          );
        }}
      />
    </div>
  );
};
