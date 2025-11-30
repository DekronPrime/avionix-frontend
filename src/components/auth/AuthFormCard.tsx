import Link from "next/link";
import React, { FC, ReactNode } from "react";

interface AuthFormCardProps {
  children: ReactNode;
  title: string;
  switchText?: string;
  switchHref?: string;
  switchLabel?: string;
}

export const AuthFormCard: FC<AuthFormCardProps> = ({
  children,
  title,
  switchText,
  switchHref,
  switchLabel,
}: AuthFormCardProps) => {
  return (
    <div className="flex flex-col flex-1 h-full gap-3 justify-center text-center bg-background px-8 border-l-2 border-foreground">
      <h1 className="text-4xl font-orbitron font-bold text-black">{title}</h1>

      {switchText && switchHref && (
        <p className="inline-flex justify-center items-center gap-4 text-lg font-inter text-black/80">
          {switchText}{" "}
          <Link
            href={switchHref}
            className="bg-foreground text-white px-4 py-1 rounded-lg text-xl font-poppins font-semibold hover:underline hover:bg-dark transition-all"
          >
            {switchLabel}
          </Link>
        </p>
      )}

      <div className="">{children}</div>
    </div>
  );
};
