import { ButtonType } from "@/src/types/button";
import { cn } from "@/src/utils/cn";
import Image from "next/image";
import React from "react";

const Button: React.FC<ButtonType> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  className,
  onClick,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg transition-all";

  const variants: Record<typeof variant, string> = {
    primary:
      "bg-light gap-4 text-black hover:bg-foreground hover:border-foreground hover:text-white border-2 border-light font-semibold font-poppins",
    secondary:
      "text-light gap-4 hover:bg-light hover:text-black border-2 border-light font-semibold font-poppins",
    submit:
      "bg-foreground text-light hover:bg-dark font-semibold font-poppins uppercase",
  };

  const sizes: Record<typeof size, string> = {
    sm: "p-2 py-1 text-sm",
    md: "p-2 text-2xl",
    lg: "p-3 text-3xl",
  };

  return (
    <button
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon && (
        <Image src={icon} alt="icon" width={50} height={50} draggable="false" />
      )}
      {children}
    </button>
  );
};

export default Button;
