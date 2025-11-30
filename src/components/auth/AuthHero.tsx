import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { FC } from "react";

interface AuthHeroProps {
  imageSrc: StaticImport;
  slogan?: string;
}

export const AuthHero: FC<AuthHeroProps> = ({
  imageSrc,
  slogan = "Avionix — Fly smarter",
}: AuthHeroProps) => {
  return (
    <section className="relative w-full h-96 md:h-full">
      <Image
        src={imageSrc}
        alt="Auth background"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-0% from-black/50 via-50% via-black/35 to-100% to-black/0" />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <h2 className="text-6xl text-center uppercase font-orbitron font-bold drop-shadow-lg max-w-3xl leading-tight">
          {slogan}
        </h2>
      </div>
    </section>
  );
};
