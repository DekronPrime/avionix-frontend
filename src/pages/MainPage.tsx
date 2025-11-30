"use client";

import Image from "next/image";
import Button from "../components/common/Button";

import Flight from "@/public/icons/flight-light.png";
import BgImage from "@/public/images/main-bg.png";
import Link from "next/link";

export const MainPage = () => {
  return (
    <>
      <main className="flex flex-1 items-center">
        <section className="flex flex-1 items-center justify-center">
          <Image
            src={BgImage}
            alt="Background"
            fill
            priority
            className="object-cover object-center -z-10"
          />

          <div className="inline-flex flex-col items-center gap-12 text-black max-w-7xl">
            <div className="inline-flex flex-col items-center gap-6">
              <h1 className="text-6xl text-black font-bold font-orbitron">
                Your command center for the sky
              </h1>

              <p className="text-3xl font-medium font-inter text-pretty text-center">
                From ticket management to real-time aircraft monitoring — your
                all-in-one aviation management platform designed for efficiency,
                security, and speed.
              </p>
            </div>
            <Link href={"/flights"}>
              <Button
                variant="primary"
                size="lg"
                className="!bg-foreground hover:!bg-dark !px-6 !font-bold !w-fit border-none text-light flex-row-reverse"
                icon={Flight}
              >
                Explore Flights
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};
