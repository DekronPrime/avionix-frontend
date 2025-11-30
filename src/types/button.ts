import { StaticImageData } from "next/image";

export type ButtonType = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "submit";
  size?: "sm" | "md" | "lg";
  icon?: StaticImageData;
  className?: string;
  onClick?: Function;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
