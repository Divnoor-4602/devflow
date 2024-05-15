import React from "react";

interface filterProps {
  filterList: string[];
}

const HomeFilterBadges = ({ filterList }: filterProps) => {
  const active = "Newest";

  return (
    <>
      <div className="mt-8 hidden justify-start gap-4 md:flex">
        {filterList.map((filter) => {
          return (
            <div
              key={filter}
              className={`${
                active === filter
                  ? "bg-primary-100 text-primary-500 dark:bg-dark-400 "
                  : "background-light800_dark300 text-light-500"
              }  body-medium cursor-pointer rounded-lg px-6 py-3 capitalize `}
            >
              {filter}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomeFilterBadges;
