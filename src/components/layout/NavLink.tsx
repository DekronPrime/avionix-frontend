"use client";

import { cn } from "@/src/utils/cn";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  label: string;
  href: string;
  icon?: StaticImageData;
};

export const NavLink: React.FC<NavLinkProps> = ({
  label,
  href,
  icon,
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex px-4 py-2 items-center gap-2 border-b-2 rounded-lg transition-all",
        isActive
          ? "border-light text-light font-semibold rounded-none"
          : "border-transparent hover:text-light hover:bg-cyan-700"
      )}
    >
      {icon && (
        <Image src={icon} alt="icon" width={40} height={40} draggable="false" />
      )}
      <span className="font-poppins text-2xl font-semibold">{label}</span>
    </Link>
  );
};
