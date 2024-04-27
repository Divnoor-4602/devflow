import React from "react";
import Image from "next/image";
import searchIcon from "../../../public/assets/icons/search.svg";
import { Input } from "@/components/ui/input";

const GlobalSearch = () => {
  return (
    <>
      <div className="relative h-[56px] w-full max-w-[600px] max-lg:hidden">
        <div className="background-light800_darkgradient flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
          {/* search image */}
          <Image
            src={searchIcon}
            alt="search icon"
            width={24}
            height={24}
            className="cursor-pointer"
          />
          {/* input shadcn */}
          <Input
            type="text"
            placeholder="Search globally"
            value=""
            className="no-focus paragraph-regular border-none bg-transparent text-light-400 shadow-none outline-none dark:text-light-500"
          />
        </div>
      </div>
    </>
  );
};

export default GlobalSearch;
