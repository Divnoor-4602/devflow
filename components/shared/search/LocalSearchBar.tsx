"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const LocalSearchBar = ({
  route,
  iconPosition,
  imgSrc,
  placeholderText,
  otherClasses,
}: {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholderText: string;
  otherClasses: string;
}) => {
  return (
    <>
      <div className="relative h-[56px] w-full ">
        <div
          className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-1 rounded-xl px-4 dark:shadow-sm ${otherClasses}`}
        >
          {/* search image */}
          {iconPosition === "left" && (
            <Image
              src={imgSrc}
              alt="icon"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          )}
          {/* input shadcn */}
          <Input
            type="text"
            placeholder={placeholderText}
            value=""
            onChange={() => {}}
            className="no-focus paragraph-regular border-none bg-transparent text-light-400 shadow-none outline-none dark:text-light-500"
          />
          {/* search image */}
          {iconPosition === "right" && (
            <Image
              src={imgSrc}
              alt="icon"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default LocalSearchBar;
