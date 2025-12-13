"use client";

import { cn } from "@/src/utils/cn";
import React from "react";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "status" | "iso" | "iata";
  textColor?: string;
  bgColor?: string;
  tooltip?: string;
  className?: string;
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "status",
  textColor = "text-gray-700",
  bgColor = "bg-gray-100",
  tooltip,
  className,
}: BadgeProps) => {
  const baseStyles =
    "relative inline-block  font-semibold whitespace-nowrap select-none";

  const variants: Record<typeof variant, string> = {
    status: "absolute inset-0 rounded-full opacity-20 font-poppins",
    iso: "absolute inset-0 rounded-md font-ptSerif",
    iata: "absolute inset-0 rounded-md",
  };

  const sizes: Record<typeof variant, string> = {
    status: "px-3 text-lg",
    iso: "px-2 text-[16px]",
    iata: "px-2 text-[16px]",
  };

  return (
    <span
      className={cn(
        baseStyles,
        sizes[variant],
        textColor,
        tooltip && "group cursor-help",
        className
      )}
    >
      <span className={cn(variants[variant], bgColor)} />
      {children}

      {tooltip && (
        <span className="absolute w-max max-w-[275px] hidden -right-0 group-hover:block bg-black/70 text-white text-xs text-wrap p-2 rounded-lg font-inter z-10">
          {tooltip}
        </span>
      )}
    </span>
  );
};
