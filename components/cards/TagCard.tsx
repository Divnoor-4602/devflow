import React from "react";

interface TagCardProps {
  _id: string;
  questions: string[];
  name: string;
}

const TagCard = async ({ name, questions, _id }: TagCardProps) => {
  return (
    <>
      <div className="background-light900_dark200 shadow-light100_dark100 light-border flex w-[260px] cursor-pointer flex-col  gap-4 rounded-[10px] border px-[30px] py-10">
        <div className="paragraph-semibold text-dark200_light900 background-light800_dark400 w-fit  rounded-md px-5 py-1.5 ">
          {name}
        </div>
        <div className="small-regular text-dark500_light700 leading-4">
          JavaScript, often abbreviated as JS, is a programming language that is
          one of the core technologies of the World Wide Web, alongside HTML and
          CSS
        </div>
        {/* questions  */}
        <div className="flex items-center gap-2.5">
          <div className="body-semibold text-primary-500">
            {questions.length > 0 ? `${questions.length}+` : 0}
          </div>
          <div className="small-medium text-dark400_light500">Questions</div>
        </div>
      </div>
    </>
  );
};

export default TagCard;
