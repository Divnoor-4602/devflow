import React from "react";
import Image from "next/image";
import { getQuestionById } from "@/lib/actions/question.action";
import upvoteIcon from "../../../../public/assets/icons/upvote.svg";
import downvoteIcon from "../../../../public/assets/icons/downvote.svg";
import starRed from "../../../../public/assets/icons/star-red.svg";
import Metrics from "@/components/shared/Metrics";
import ParseHTML from "@/components/shared/ParseHTML";
import TagHolder from "@/components/shared/TagHolder";
import Answer from "@/components/forms/Answer";

const page = async ({
  params,
  searchParams,
}: {
  params: { questionId: string };
}) => {
  const question = await getQuestionById({ questionId: params.questionId });

  return (
    <>
      <div className="mt-9">
        {/* question header */}
        <div className="mb-8 flex flex-col gap-[18px]">
          {/* author name and picture */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Image
                src={question.author.picture}
                alt="author profile picture"
                width={22}
                height={22}
                className="rounded-full"
              />
              <div className="paragraph-semibold text-dark300_light700">
                {question.author.name} | @{question.author.username}
              </div>
            </div>
            {/* upvotes downvotes and save */}
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
                  {question.upvotes.length}
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
                  {question.downvotes.length}
                </div>
              </div>
              <Image src={starRed} alt="save icon" width={18} height={18} />
            </div>
          </div>
          {/* question title */}
          <div className="h2-semibold text-dark200_light900 leading-[31px]">
            {question.title}
          </div>
          {/* metrics */}
          <div className="flex flex-wrap items-center gap-[15px]">
            <Metrics
              metricTitle="Votes"
              metricQuantity={question.upvotes.length}
            />
            <Metrics
              metricTitle="Answers"
              metricQuantity={question.answers.length}
            />
            <Metrics metricTitle="Views" metricQuantity={question.views} />
          </div>
        </div>
        <ParseHTML data={question.content} />
        <div className="mt-8 flex gap-4">
          {/* tags */}
          {question.tags.length > 0 &&
            question.tags.map((tag) => {
              return (
                <>
                  <TagHolder tagName={tag.name} key={tag.name} />
                </>
              );
            })}
        </div>
        {/* answer form */}
        <div>
          <Answer />
        </div>
      </div>
    </>
  );
};

export default page;
