import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface filterProps {
  route: string;
  filterList: string[];
}

const LocalSelectFilter = ({ route, filterList }: filterProps) => {
  return (
    <>
      <Select>
        <SelectTrigger
          className={`${
            route === "/" ? "flex md:hidden" : "flex"
          } no-focus text-dark500_light700 min-h-[56px] items-center border bg-light-800 px-5 py-2.5 outline-none dark:border-slate-800 dark:bg-dark-300 dark:shadow-sm sm:max-w-[200px] `}
        >
          <SelectValue placeholder="Select a Filter" />
        </SelectTrigger>
        <SelectContent className="text-dark500_light700 no-focus border dark:border-slate-800 dark:bg-slate-900">
          {filterList.map((filter) => {
            return (
              <>
                <SelectItem key={filter} value={filter}>
                  {filter}
                </SelectItem>
              </>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
};

export default LocalSelectFilter;
