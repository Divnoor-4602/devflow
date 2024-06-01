"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

interface Props {
  filterList: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const LocalSelectFilter = ({
  filterList,
  containerClasses,
  otherClasses,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramFilter = searchParams.get("filter");

  const handleTypeClick = (item: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value: item.toLowerCase(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <div className={`relative ${containerClasses}`}>
        <Select
          defaultValue={paramFilter || undefined}
          onValueChange={handleTypeClick}
        >
          <SelectTrigger
            className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
          >
            <div className="line-clamp-1 flex-1 text-left">
              <SelectValue placeholder="Select a Filter" />
            </div>
          </SelectTrigger>
          <SelectContent className="text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300">
            <SelectGroup>
              {filterList.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default LocalSelectFilter;
