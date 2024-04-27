import Link from "next/link";
import { Button } from "@/components/ui/button";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import LocalSelectFilter from "@/components/shared/filter/LocalSelectFilter";
import HomeFilterBadges from "@/components/shared/filter/HomeFilterBadges";

export default function Home() {
  return (
    <>
      <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link
          href={"/ask-question"}
          className="flex justify-end max-sm:w-full "
        >
          <Button className="primary-gradient min-h-[46px] px-4 py-3 text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      {/* searchbar and filters */}

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholderText="Search questions"
          otherClasses="flex-1"
        />

        <LocalSelectFilter
          route="/"
          filterList={["Newest", "Reccomended", "Frequent", "Unanswered"]}
        />
      </div>
      <HomeFilterBadges
        filterList={["Newest", "Reccomended", "Frequent", "Unanswered"]}
      />
    </>
  );
}
