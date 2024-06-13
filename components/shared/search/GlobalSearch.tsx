"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import searchIcon from "../../../public/assets/icons/search.svg";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import GlobalResult from "./GlobalResult";

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchContainerRef = useRef(null);

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    setIsOpen(false);

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [pathname]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["global", "q"],
          });

          router.push(newUrl, { scroll: false });
        } else if (search === "") {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["global", "type"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, router, pathname, searchParams, query]);

  return (
    <>
      <div
        className="relative h-[56px] w-full max-w-[600px] max-lg:hidden"
        ref={searchContainerRef}
      >
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
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (!isOpen) {
                setIsOpen(true);
              }
              if (e.target.value === "") {
                setIsOpen(false);
              }
            }}
            className="no-focus paragraph-regular border-none bg-transparent text-light-400 shadow-none outline-none dark:text-light-500"
          />
        </div>
        {isOpen && <GlobalResult />}
      </div>
    </>
  );
};

export default GlobalSearch;
