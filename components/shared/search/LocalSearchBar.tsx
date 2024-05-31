"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    // debounce
    const debounceDelay: any = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else if (route === pathname) {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["q"],
        });

        router.push(newUrl, { scroll: false });
      }
      return clearTimeout(debounceDelay);
    }, 300);
  }, [router, pathname, route, searchParams, query, search]);

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
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
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
