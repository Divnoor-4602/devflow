import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <>
      <div className="h1-bold text-dark100_light900">Ask a Question</div>
      <div className="mt-9">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="text-dark400_light800 text-base font-medium">
              Question title <span className="text-primary-500">*</span>
            </div>
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-dark400_light800 text-base font-medium">
              Detailed explanation of your problem?
              <span className="text-primary-500"> *</span>
            </div>
            <Skeleton className="h-48 w-full" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-dark400_light800 text-base font-medium">
              Tags<span className="text-primary-500"> *</span>
            </div>
            <Skeleton className="h-12 w-full" />
          </div>
          <Button className="primary-gradient min-h-[46px] w-fit self-end px-4 py-3 text-light-900">
            Post question
          </Button>
        </div>
      </div>
    </>
  );
};

export default Loading;
