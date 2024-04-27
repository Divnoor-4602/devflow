"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import signUpIcon from "../../../public/assets/icons/sign-up.svg";
import userIcon from "../../../public/assets/icons/account.svg";
import logoutIcon from "../../../public/assets/icons/Logout 3.svg";

import { sidebarLinks } from "@/constants";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const LeftSidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="background-light900_dark200 text-dark200_light900 light-border sm:flex-between custom-scrollbar sticky left-0 top-0   hidden min-h-screen w-fit flex-col border-r p-6  pt-32 lg:w-[266px]">
        {/* sidebar nav */}
        <div className="flex flex-col gap-4 lg:w-full">
          {/* Sidebar links */}
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
                      isActive
                        ? "base-bold text-white"
                        : "text-dark300_light900"
                    } base-medium   mt-px hidden lg:block`}
                  >
                    {link.label}
                  </span>
                </Link>
              </>
            );
          })}
        </div>
        {/* action buttons */}
        <SignedOut>
          <div className="flex w-full flex-col gap-4">
            <Link
              className="btn-secondary flex items-center justify-center rounded-lg p-2 text-sm text-primary-500"
              href={"/sign-in"}
            >
              <span className="lg:hidden">
                <Image
                  src={userIcon}
                  alt="sign up icon"
                  width={20}
                  height={20}
                  className="invert-colors"
                />
              </span>
              <span className="hidden lg:block">Log In</span>
            </Link>
            <Link
              className="btn-tertiary flex items-center justify-center rounded-lg border p-2 text-sm dark:border-slate-800"
              href={"/sign-up"}
            >
              <span className="lg:hidden">
                <Image
                  src={signUpIcon}
                  alt="sign up icon"
                  width={20}
                  height={20}
                  className="invert-colors"
                />
              </span>
              <span className="hidden lg:block">Sign up</span>
            </Link>
          </div>
        </SignedOut>
        <SignedIn>
          <Link
            className="text-dark300_light900 base-medium flex w-full items-center gap-3 px-3"
            href={"/"}
          >
            <span className="">
              <Image
                src={logoutIcon}
                alt="logout icon"
                width={20}
                height={20}
                className="invert-colors"
              />
            </span>
            <span className="hidden lg:block">Logout</span>
          </Link>
        </SignedIn>
      </div>
    </>
  );
};

export default LeftSidebar;
