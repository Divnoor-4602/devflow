import React from "react";
import upvoteIcon from "../../public/assets/icons/upvote.svg";
import downvoteIcon from "../../public/assets/icons/downvote.svg";
import starRed from "../../public/assets/icons/star-red.svg";
import Image from "next/image";

const Votes = () => {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Image
            src={upvoteIcon}
            alt="upvote icon"
            width={18}
            height={18}
            className="cursor-pointer"
          />
          <div className="subtle-medium text-dark400_light900 background-light700_dark400 flex items-center justify-center rounded p-1">
            {0}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={downvoteIcon}
            alt="downvote icon"
            width={18}
            height={18}
            className="cursor-pointer"
          />
          <div className="subtle-medium text-dark400_light900 background-light700_dark400 flex items-center justify-center rounded p-1">
            {0}
          </div>
        </div>
        <Image src={starRed} alt="save icon" width={18} height={18} />
      </div>
    </>
  );
};

export default Votes;
