import React from "react";
import pfp from "../../public/assets/images/pfpExample.jpeg";
import Image from "next/image";
import TagHolder from "../shared/TagHolder";
import Metrics from "../shared/Metrics";
import { getTimeStamp } from "@/lib/utils";

interface QuestionCardsProps {
  _id: string;
  title: string;
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  content: string;
  tags: {
    _id: string;
    name: string;
  }[];
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const QuestionCards = ({
  _id,
  title,
  author,
  content,
  tags,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionCardsProps) => {
  return (
    <>
      {/* question box */}
      <div className="dark:dark-gradient flex flex-col gap-6 rounded-lg bg-light-900 px-12 py-6 shadow-sm">
        {/* header */}
        <div className="flex flex-col gap-[14px]">
          {/* h3 question text */}
          <div className="base-semibold sm:h3-semibold text-dark200_light900 line-clamp-1">
            {title}
          </div>
          {/* tags */}
          <div className="flex w-full gap-2">
            {tags.map((tag) => {
              return (
                <React.Fragment key={tag._id}>
                  <TagHolder tagName={tag.name} />
                </React.Fragment>
              );
            })}
          </div>
        </div>
        {/* question card footer */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:gap-0">
          {/* question author */}
          <div className="flex items-center gap-2">
            {/* profile image */}
            <Image
              src={pfp}
              alt="totoro image"
              width={20}
              height={20}
              className="rounded-full object-contain object-center"
            />
            {/* author */}
            <div className="text-dark400_light700 body-medium">
              {author.name}
            </div>
            <div className="text-dark400_light700 small-regular hidden md:block">
              •
            </div>
            {/* time created */}
            <div className="small-regular text-dark400_light700 hidden md:block">
              {getTimeStamp(createdAt)}
            </div>
          </div>
          {/* Statistics */}
          <div className="flex flex-wrap gap-[9px]">
            <Metrics metricTitle="Votes" metricQuantity={upvotes} />
            <Metrics metricTitle="Answers" metricQuantity={answers.length} />
            <Metrics metricTitle="Views" metricQuantity={views} />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCards;
