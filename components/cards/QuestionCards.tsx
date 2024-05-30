import React from "react";
import Image from "next/image";
import TagHolder from "../shared/TagHolder";
import Metrics from "../shared/Metrics";
import { getTimeStamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";
import Link from "next/link";

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
  answers: number;
  createdAt: Date;
  clerkId?: string;
}

const QuestionCards = ({
  _id,
  clerkId,
  title,
  author,
  content,
  tags,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionCardsProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <>
      {/* question box */}
      <div className="dark:dark-gradient flex flex-col gap-6 rounded-lg bg-light-900 px-12 py-6 shadow-sm">
        {/* header */}
        <div className="flex flex-col gap-[14px]">
          <div className="flex flex-col-reverse items-end justify-between gap-5 sm:flex-row">
            <div>
              <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
                {getTimeStamp(createdAt)}
              </span>
              <Link href={`/question/${_id}`}>
                <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
                  {title}
                </h3>
              </Link>
            </div>
            <div className="flex justify-end">
              <SignedIn>
                {showActionButtons && (
                  <EditDeleteAction type="Question" itemId={_id} />
                )}
              </SignedIn>
            </div>
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
              src={author.picture}
              alt="Author profile picture"
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
            <Metrics metricTitle="Answers" metricQuantity={answers} />
            <Metrics metricTitle="Views" metricQuantity={views} />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCards;
