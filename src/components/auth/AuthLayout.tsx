import React, { FC, ReactNode } from "react";

interface AuthLayoutProps {
  left: ReactNode;
  right: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = ({
  left,
  right,
}: AuthLayoutProps) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        <div className="md:col-span-2">{left}</div>
        <div className="md:col-span-1 justify-center">{right}</div>
      </div>
    </div>
  );
};
