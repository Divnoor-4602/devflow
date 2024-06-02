"use client";

import React from "react";
import { Button } from "../ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

interface Props {
  isNext: boolean;
}

const Pagination = ({ isNext }: Props) => {
  console.log(isNext);

  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;

  const handleNavigation = (item: string) => {
    if (item === "next") {
      const newPage = currentPage + 1;
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "page",
        value: newPage.toString(),
      });

      router.push(newUrl, { scroll: false });
    } else {
      const newPage = currentPage - 1;
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "page",
        value: newPage.toString(),
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center gap-4">
        <Button
          className="btn light-border-2 text-dark400_light800 h-9 w-14 border px-[14px] py-2 text-[14px] font-medium shadow-sm"
          disabled={currentPage === 1}
          onClick={() => handleNavigation("previous")}
        >
          Prev
        </Button>
        {/* page number */}
        <div className="body-semibold primary-gradient flex size-9 items-center justify-center rounded-lg text-white">
          {currentPage}
        </div>
        <Button
          className="btn light-border-2 text-dark400_light800 h-9 w-14 border px-[14px] text-sm font-medium shadow-sm"
          onClick={() => handleNavigation("next")}
          disabled={!isNext}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Pagination;
