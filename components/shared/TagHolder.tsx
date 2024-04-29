import React from "react";

interface tagHolderProps {
  tagName: string;
}

const TagHolder = ({ tagName }: tagHolderProps) => {
  return (
    <>
      <div className="background-light800_dark300 subtle-medium flex w-fit items-center rounded-lg px-4 py-2 uppercase text-light-400 shadow-md dark:text-light-500">
        {tagName}
      </div>
    </>
  );
};

export default TagHolder;
