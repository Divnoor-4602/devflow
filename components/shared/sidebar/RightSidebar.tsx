import React from "react";
import rightArrowIcon from "../../../public/assets/icons/arrow-right.svg";
import Image from "next/image";

const RightSidebar = () => {
  const demoQuestions = [
    {
      _id: 1,
      title: "How to create a new project? ",
    },
    { _id: 2, title: "How to deploy a project?" },
    { _id: 3, title: "How to add a new user?" },
    { _id: 4, title: "How to create a new project?" },
    { _id: 5, title: "How to deploy a project?" },
    { _id: 6, title: "How to add a new user?" },
  ];
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
      <div className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 hidden h-screen w-[300px] flex-col overflow-y-auto border-l px-4 pt-32 font-inter shadow-sm xl:flex">
        {/* Question */}
        <div className="text-dark200_light900 h3-bold">Top Questions</div>
        {/* top few popular questions */}
        <div className="mt-7 flex flex-col gap-[30px]">
          {demoQuestions.map((question) => {
            return (
              <>
                <div
                  key={question._id}
                  className="flex w-full cursor-pointer items-center justify-between"
                >
                  <span className="body-medium text-dark500_light700 w-[200px]">
                    {question.title}
                  </span>
                  <Image src={rightArrowIcon} alt="right arrow" />
                </div>
              </>
            );
          })}
        </div>
        {/* Popular tags */}
        <div className="text-dark200_light900 h3-bold mt-16">Popular Tags</div>
        <div className="mt-7 flex flex-col gap-[16px]">
          {demoTags.map((tag) => {
            return (
              <div
                key={tag._id}
                className="flex w-full items-center justify-between"
              >
                <div className="background-light800_dark300 subtle-medium w-fit rounded-lg px-4 py-2 uppercase text-light-400 dark:text-light-500">
                  {tag.name}
                </div>
                <div className="text-dark500_light700 small-medium">
                  {tag.num}
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
