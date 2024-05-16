import React from "react";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import LocalSelectFilter from "@/components/shared/filter/LocalSelectFilter";
import UserCard from "@/components/cards/UserCard";
import { getAllUsers } from "@/lib/actions/user.action";

const page = async () => {
  const users = await getAllUsers({});

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
            route="/community"
            filterList={["New Users", "Old Users", "Top Contributors"]}
          />
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          {users.map((user) => {
            return (
              <>
                <UserCard
                  name={user.name}
                  picture={user.picture}
                  _id={user._id}
                  username={"Divnoor"}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default page;