"use client";

import { cn } from "@/src/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminNavLinkProps = {
  label: string;
  href: string;
};

export const AdminNavLink: React.FC<AdminNavLinkProps> = ({
  label,
  href,
}: AdminNavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "py-2 font-poppins text-xl font-semibold transition-all",
        isActive ? "text-foreground" : "text-black hover:text-foreground"
      )}
    >
      {label}
    </Link>
  );
};
