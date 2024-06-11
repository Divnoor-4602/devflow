import React from "react";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import LocalSelectFilter from "@/components/shared/filter/LocalSelectFilter";
import UserCard from "@/components/cards/UserCard";
import { getAllUsers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination";
import { CommunityPageFilters } from "@/constants";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const users = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: Number(searchParams.page) || 1,
    pageSize: 12,
  });

  return (
    <>
      <div className="h1-bold text-dark100_light900">All Users</div>
      <div className="mt-9">
        <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearchBar
            route="/community"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholderText="Search by username"
            otherClasses="flex-1"
          />

          <LocalSelectFilter
            filterList={CommunityPageFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
            containerClasses="flex"
          />
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          {users.users.map((user) => {
            return (
              <>
                <UserCard
                  key={user._id}
                  name={user.name}
                  picture={user.picture}
                  _id={user._id}
                  username={user.username}
                />
              </>
            );
          })}
        </div>
      </div>
      <div className="mt-10">
        <Pagination isNext={users.isNext} />
      </div>
    </>
  );
};

export default Page;
