"use client";

import Image from "next/image";
import Button from "../common/Button";

import Link from "next/link";
import { NavLink } from "./NavLink";

import MainLogo from "@/public/logo/main-logo.svg";
import Flight from "@/public/icons/flight-light.png";
import Info from "@/public/icons/info-light.png";
import Contact from "@/public/icons/contact-light.png";
import UserDark from "@/public/icons/user-dark.png";
import UserLight from "@/public/icons/user-light.png";
import { useAuth } from "@/src/context/AuthContext";
import { AdminNavLink } from "./AdminNavLink";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  return (
    <>
      <header className="flex flex-col">
        <div className="bg-dark px-9 py-6 border-b-[3px] border-light">
          <div className="w-full mx-auto border-1 flex justify-between items-center ">
            <Link href={"/"}>
              <Image
                src={MainLogo}
                alt="Avionix Logo"
                width={325}
                height={50}
                draggable="false"
              />
            </Link>

            <div className="inline-flex gap-3">
              <NavLink href="/flights" label="Flights" icon={Flight} />
              <NavLink href="/about" label="About" icon={Info} />
              <NavLink href="/contact" label="Contacts" icon={Contact} />
            </div>

            <div className="inline-flex gap-3">
              {user ? (
                <div className="inline-flex gap-4 items-center">
                  <Button
                    variant="secondary"
                    size="md"
                    className="px-3"
                    onClick={async () => {
                      await signOut();
                      router.push("/");
                    }}
                  >
                    Log Out
                  </Button>
                  <Link href="/profile">
                    <Button
                      variant="primary"
                      size="md"
                      className="px-3 group relative"
                    >
                      <div className="relative w-[30px] h-[30px]">
                        <Image
                          src={UserDark}
                          alt="User dark"
                          fill
                          className="object-contain transition-opacity duration-200 opacity-100 group-hover:opacity-0"
                        />
                        <Image
                          src={UserLight}
                          alt="User light"
                          fill
                          className="object-contain absolute inset-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                        />
                      </div>
                      My Profile
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="inline-flex gap-4">
                  <Link href={"/auth/signin"}>
                    <Button variant="secondary" size="md" className="px-3">
                      Sign In
                    </Button>
                  </Link>
                  <Link href={"/auth/signup"}>
                    <Button variant="primary" size="md" className="px-3">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        {user && user.role === "ADMIN" && (
          <div className="flex justify-center items-center bg-light gap-9">
            <AdminNavLink label="Dashboard" href={`/admin/dashboard`} />
            <AdminNavLink label="Airports" href={`/admin/airports`} />
            <AdminNavLink label="Airlines" href={`/admin/airlines`} />
            <AdminNavLink label="Aircraft" href={`/admin/aircraft`} />
            <AdminNavLink label="Flights" href={`/admin/flights`} />
            <AdminNavLink label="Users" href={`/admin/users`} />
            <AdminNavLink label="Bookings" href={`/admin/bookings`} />
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
