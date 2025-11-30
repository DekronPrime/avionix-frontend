"use client";

import Image from "next/image";
import { useState } from "react";

import EyeClosed from "@/public/icons/eye-closed-dark.png";
import EyeOpen from "@/public/icons/eye-open-dark.png";
import Tooltip from "@/public/icons/info-tooltip-dark.png";
import { InputFieldType } from "@/src/types/inputField";
import { cn } from "@/src/utils/cn";

export default function InputField({
  id,
  label,
  required,
  type = "text",
  placeholder,
  tooltip,
  error,
  note,
  noteStatus = null,
  ...props
}: InputFieldType) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const actualType = isPassword ? (showPassword ? "text" : "password") : type;
  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-center justify-start gap-1 text-sm font-semibold font-poppins text-black cursor-help"
      >
        {tooltip && (
          <span className="relative group inline-flex items-center">
            <Image
              src={Tooltip}
              alt="tooltip"
              width={15}
              height={15}
              draggable="false"
            />
            <span className="absolute w-max max-w-[275px] hidden right-8 group-hover:block bg-black/50 text-white text-xs p-2 rounded-lg z-10">
              {tooltip}
            </span>
          </span>
        )}
        <span>
          {label}
          {required && "*"}
        </span>
      </label>

      <div className="relative">
        <input
          id={id}
          type={actualType}
          placeholder={placeholder}
          className={
            "mt-1 w-full text-[16px] font-ptSerif font-bold bg-light rounded-lg border-l-[3px] focus:border-dark border-foreground p-2.5 pl-3 text-black placeholder:text-black/50 focus:outline-none transition-all"
          }
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center"
          >
            <Image
              src={showPassword ? EyeClosed : EyeOpen}
              alt="toggle password"
              width={20}
              height={20}
              draggable="false"
              className="opacity-70 hover:opacity-100 transition"
            />
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1 text-xs font-semibold font-inter text-left text-red-700">
          {error}
        </p>
      )}

      {note && (
        <p
          className={cn(
            "mt-1 text-xs font-semibold font-inter text-left",
            noteStatus === "taken"
              ? "text-red-600"
              : noteStatus === "free"
              ? "text-green-700"
              : "text-yellow-600"
          )}
        >
          {noteStatus === "taken"
            ? `${note} is already taken`
            : noteStatus === "free"
            ? `${note} is available`
            : noteStatus === "checking"
            ? "Checking..."
            : ""}
        </p>
      )}
    </div>
  );
}
