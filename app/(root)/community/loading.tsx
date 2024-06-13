import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Users</h1>
      </div>

      <div className="mb-12 mt-11 flex flex-wrap items-center justify-between gap-5">
        <Skeleton className="h-14 flex-1" />
        <div className="max-md:hidden">
          <Skeleton className="h-14 w-28" />
        </div>
      </div>

      {/* cards */}
      <div className="mt-8 flex flex-wrap gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => {
          return <Skeleton key={index} className="size-60 rounded-xl" />;
        })}
      </div>
    </>
  );
};

export default Loading;
