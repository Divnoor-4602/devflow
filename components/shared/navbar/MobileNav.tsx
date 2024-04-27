"use client";

import React from "react";
import Image from "next/image";
import hamburger from "../../../public/assets/icons/hamburger.svg";
import { sidebarLinks } from "@/constants";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const NavContent = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-col gap-6">
        {sidebarLinks.map((link, index) => {
          const isActive =
            (pathname.includes(link.route) && pathname.length > 1) ||
            pathname === link.route;

          return (
            <>
              <Link
                className={`${
                  isActive && "primary-gradient"
                } flex cursor-pointer items-center justify-start gap-4 rounded-xl p-3`}
                href={link.route}
                key={link.label}
              >
                <Image
                  src={link.imgURL}
                  alt="sidebar icon"
                  width={20}
                  height={20}
                  className={`${isActive ? "" : "invert-colors"}`}
                />
                <span
                  className={`${
                    isActive ? "text-white" : "text-dark300_light900"
                  } mt-px    font-normal  `}
                >
                  {link.label}
                </span>
              </Link>
            </>
          );
        })}
      </div>
    </>
  );
};

const MobileNav = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src={hamburger}
            alt="hamburger menu"
            width={36}
            height={36}
            className="invert-colors cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="background-light900_dark200 w-2/3 border-none"
        >
          <Link href={"/"} className="flex items-center gap-1">
            <Image
              src="/assets/images/site-logo.svg"
              width={23}
              height={23}
              alt="DevOverflow"
            />
            <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900">
              Dev<span className="text-primary-500">Overflow</span>
            </p>
          </Link>
          <div className="flex-between mt-16 flex w-full flex-col gap-6">
            {/* nav content */}
            <div className="w-full">
              <NavContent />
            </div>

            {/* nav action buttons */}
            <div className="w-full">
              <SignedOut>
                <SheetClose>
                  <div className="flex w-full flex-col gap-4">
                    <Link
                      className="btn-secondary flex items-center justify-center rounded-lg p-2 text-sm text-primary-500"
                      href={"/sign-in"}
                    >
                      <span className="">Log In</span>
                    </Link>
                    <Link
                      className="btn-tertiary flex items-center justify-center rounded-lg border p-2 text-sm dark:border-slate-800"
                      href={"/sign-up"}
                    >
                      <span className="">Sign up</span>
                    </Link>
                  </div>
                </SheetClose>
              </SignedOut>
              <SignedIn>
                <Link
                  className="btn-tertiary flex w-full items-center justify-center rounded-lg border p-2 text-sm dark:border-slate-800"
                  href={"/"}
                >
                  <span className="text-white">Logout</span>
                </Link>
              </SignedIn>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNav;
