import React from "react";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import LocalSelectFilter from "@/components/shared/filter/LocalSelectFilter";
import { getAllTags } from "@/lib/actions/tag.actions";
import TagCard from "@/components/cards/TagCard";
import NoResult from "@/components/shared/NoResult";
import Link from "next/link";
import { CommunityPageFilters, TagPageFilters } from "@/constants";

const page = async () => {
  const tags = await getAllTags({});

  return (
    <>
      <div className="h1-bold text-dark100_light900">Tags</div>
      <div className="mt-9">
        <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearchBar
            route="/community"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholderText="Search by tag name..."
            otherClasses="flex-1"
          />

          <LocalSelectFilter
            filterList={CommunityPageFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
            containerClasses="hidden max-md:flex"
          />
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          {tags.length > 0 ? (
            <>
              {tags.map((tag) => {
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
              <NoResult />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
