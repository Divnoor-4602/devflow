import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Jobs</h1>
      </div>
      <div className="mb-12 mt-11 flex sm:flex-row flex-col-reverse items-center justify-between gap-5">
        <Skeleton className="h-14 max-sm:w-full w-1/2" />

        <Skeleton className="h-14 max-sm:w-full w-1/2" />

        <Button
          className="primary-gradient min-w-[170px] min-h-[56px] text-light-900 px-4 py-3 self-end"
          disabled
        >
          Find Jobs
        </Button>
      </div>
    </>
  );
};

export default Loading;
