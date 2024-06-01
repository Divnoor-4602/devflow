"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

interface filterProps {
  filterList: string[];
}

const HomeFilterBadges = ({ filterList }: filterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [active, setActive] = useState("");

  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <>
      <div className="mt-8 hidden justify-start gap-4 md:flex">
        {filterList.map((filter) => {
          return (
            <div
              key={filter}
              className={`${
                active === filter
                  ? "bg-primary-100 text-primary-500 dark:bg-dark-400 "
                  : "background-light800_dark300 text-light-500"
              }  body-medium cursor-pointer rounded-lg px-6 py-3 capitalize `}
              onClickCapture={() => handleTypeClick(filter)}
            >
              {filter}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomeFilterBadges;
