"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import imgSrc from "../../../public/assets/icons/search.svg";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

interface JobSearchParams {
  otherClasses: string | undefined;
  route: string;
}

const JobSearchBar = ({ otherClasses, route }: JobSearchParams) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const jobQuery = searchParams.get("query");

  const [search, setSearch] = useState(jobQuery || "");

  useEffect(() => {
    const debounceDelay: any = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else if (route === pathname) {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });

        router.push(newUrl, { scroll: false });
      }
      return clearTimeout(debounceDelay);
    }, 300);
  }, [pathname, router, jobQuery, searchParams, search, route]);

  return (
    <>
      <div className="relative h-[56px] flex w-full md:w-1/2 border light-border rounded-lg">
        <div
          className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-1 rounded-lg px-4 dark:shadow-sm ${otherClasses}`}
        >
          <Image src={imgSrc} alt="search" width={24} height={24} />
          <Input
            type="text"
            placeholder="Job title, Company or Keywords"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="no-focus paragraph-regular border-none bg-transparent text-light-400 shadow-none outline-none dark:text-light-500 placeholder:text-light-400"
          />
        </div>
      </div>
    </>
  );
};

export default JobSearchBar;
