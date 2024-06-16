import { Skeleton } from "../ui/skeleton";

const SkeletonCard = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => {
        return <Skeleton key={index} className="h-48 w-full rounded-xl" />;
      })}
    </>
  );
};

export default SkeletonCard;
