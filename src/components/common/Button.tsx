import { cn } from "@/src/utils/cn";
import Image, { StaticImageData } from "next/image";
import React from "react";

type ButtonType = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "submit" | "admin" | "cancel";
  size?: "sm" | "md" | "lg" | "adm";
  icon?: StaticImageData;
  iconSize?: number;
  className?: string;
  onClick?: Function;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonType> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconSize = 50,
  className,
  onClick,
  ...props
}: ButtonType) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg transition-all";

  const variants: Record<typeof variant, string> = {
    primary:
      "bg-light gap-4 text-black hover:bg-foreground hover:border-foreground hover:text-white border-2 border-light font-semibold font-poppins",
    secondary:
      "text-light gap-4 hover:bg-light hover:text-black border-2 border-light font-semibold font-poppins",
    submit:
      "gap-3 bg-foreground text-light hover:bg-dark font-semibold font-poppins uppercase",
    admin:
      "bg-dark text-light hover:bg-black/70 font-semibold font-poppins w-[300px] gap-3 uppercase",
    cancel:
      "gap-3 bg-background text-black hover:bg-light font-semibold font-poppins capitalize",
  };

  const sizes: Record<typeof size, string> = {
    sm: "p-2 py-1 text-sm",
    md: "p-2 text-2xl",
    lg: "p-3 text-3xl",
    adm: "px-4 py-3 text-xl",
  };

  return (
    <button
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon && (
        <Image
          src={icon}
          alt="icon"
          width={iconSize}
          height={iconSize}
          draggable="false"
        />
      )}
      {children}
    </button>
  );
};

export default Button;
