"use client";
import { useState } from "react";

import { useSearchParams, useRouter } from "next/navigation";
import { globalFilters } from "@/constants";
import { formUrlQuery } from "@/lib/utils";

const GlobalFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [active, setActive] = useState("");

  const globalFilter = searchParams.get("type");

  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: item.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <>
      {/* tags */}
      <div className=" flex items-center gap-6 border-b border-light-700 p-6 dark:border-dark-500 ">
        <div className="small-semibold text-dark400_light800">Type:</div>
        <div className="flex gap-3">
          {/* tags */}
          {globalFilters.map((item, index) => {
            return (
              <>
                <div
                  className={`background-light700_dark300 small-semibold cursor-pointer rounded-[40px] px-[20px] py-[10px] text-dark-500 hover:text-primary-500 dark:text-light-900 hover:dark:text-primary-500 ${
                    active.toLowerCase() === item.value.toLowerCase() &&
                    "bg-primary-500 text-white hover:text-white dark:bg-primary-500 dark:text-white hover:dark:text-white"
                  }`}
                  key={item.name + index}
                  onClick={() => handleTypeClick(item.value)}
                >
                  {item.value}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default GlobalFilters;
