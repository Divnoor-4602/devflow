import React from "react";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import LocalSelectFilter from "@/components/shared/filter/LocalSelectFilter";
import { getAllTags } from "@/lib/actions/tag.actions";
import TagCard from "@/components/cards/TagCard";
import NoResult from "@/components/shared/NoResult";
import Link from "next/link";
import { TagPageFilters } from "@/constants";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination";

const page = async ({ searchParams }: SearchParamsProps) => {
  const tags = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: Number(searchParams.page) || 1,
    pageSize: 15,
  });

  return (
    <>
      <div className="h1-bold text-dark100_light900">Tags</div>
      <div className="mt-9">
        <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearchBar
            route="/tags"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholderText="Search by tag name..."
            otherClasses="flex-1"
          />

          <LocalSelectFilter
            filterList={TagPageFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
            containerClasses="flex"
          />
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          {tags.tags.length > 0 ? (
            <>
              {tags.tags.map((tag) => {
                return (
                  <>
                    <Link href={`/tags/${tag._id}`}>
                      <TagCard
                        key={tag._id}
                        name={tag.name}
                        questions={tag.questions}
                        _id={tag._id}
                      />
                    </Link>
                  </>
                );
              })}
            </>
          ) : (
            <>
              <NoResult
                text="There's no question to show"
                subtext="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
                buttonText="Ask a Question"
                buttonLink="ask-question"
              />
            </>
          )}
        </div>
      </div>
      <div className="mt-10">
        <Pagination isNext={tags.isNext} />
      </div>
    </>
  );
};

export default page;
