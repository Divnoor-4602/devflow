import React from "react";
import rightArrowIcon from "../../../public/assets/icons/arrow-right.svg";
import Image from "next/image";
import TagHolder from "../TagHolder";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getTopPopularTags } from "@/lib/actions/tag.actions";
import Link from "next/link";

const RightSidebar = async () => {
  const hotQuestions = await getHotQuestions({ page: 1, pageSize: 5 });

  const topTags = await getTopPopularTags({});

  console.log(topTags);

  const demoTags = [
    { _id: 1, name: "React", num: 100 },
    { _id: 2, name: "Node", num: 200 },
    { _id: 3, name: "MongoDB", num: 300 },
    { _id: 4, name: "Express", num: 400 },
    { _id: 5, name: "React", num: 100 },
    { _id: 6, name: "Node", num: 200 },
    { _id: 7, name: "MongoDB", num: 300 },
    { _id: 8, name: "Express", num: 400 },
  ];

  return (
    <>
      <div className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 hidden h-screen w-[300px] flex-col overflow-y-auto border-l px-4 pb-4 pt-32 font-inter shadow-sm xl:flex">
        {/* Question */}
        <div className="text-dark200_light900 h3-bold">Top Questions</div>
        {/* top few popular questions */}
        <div className="mt-7 flex flex-col gap-[30px]">
          {hotQuestions.questions.map((question) => {
            return (
              <>
                <Link
                  href={`/question/${question._id}`}
                  key={question._id}
                  className="flex w-full cursor-pointer items-center justify-between"
                >
                  <span className="body-medium text-dark500_light700 w-[200px]">
                    {question.title}
                  </span>

                  <Image src={rightArrowIcon} alt="right arrow" />
                </Link>
              </>
            );
          })}
        </div>
        {/* Popular tags */}
        <div className="text-dark200_light900 h3-bold mt-16">Popular Tags</div>
        <div className="mt-7 flex flex-col gap-[16px]">
          {topTags.map((tag) => {
            return (
              <div
                key={tag._id}
                className="flex w-full items-center justify-between"
              >
                <TagHolder tagName={tag.name} />
                <div className="text-dark500_light700 small-medium">
                  {tag.numberOfQuestions}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
