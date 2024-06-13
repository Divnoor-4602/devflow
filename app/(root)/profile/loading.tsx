import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <>
      <div className="">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <Skeleton className="size-36 rounded-full" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
            <div className="flex flex-wrap items-center justify-start gap-5">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>

        <div className="h3-semibold text-dark200_light900 mt-10">Stats</div>

        <div className="mt-6 flex flex-wrap gap-5">
          <Skeleton className="h-32 w-40" />
          <Skeleton className="h-32 w-40" />
          <Skeleton className="h-32 w-40" />
          <Skeleton className="h-32 w-40" />
        </div>

        <div className="mt-10 flex gap-10">
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="mt-12 flex flex-col gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => {
            return <Skeleton key={index} className="h-44 w-full rounded-xl" />;
          })}
        </div>
      </div>
    </>
  );
};

export default Loading;
