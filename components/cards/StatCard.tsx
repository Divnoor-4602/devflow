import Image from "next/image";
import React from "react";

interface Props {
  imgUrl?: string;
  type: string;
  title?: string;
  totalQuestions?: number;
  badgeQuantity?: number;
  totalAnswers?: number;
}

const StatCard = ({
  imgUrl,
  type,
  title,
  totalQuestions,
  totalAnswers,
  badgeQuantity,
}: Props) => {
  return (
    <>
      <div className="background-light900_dark200 body-medium text-dark400_light700 light-border flex   flex-wrap items-center justify-evenly gap-4 rounded-[10px] border p-6 shadow-light-300 dark:shadow-dark-200 ">
        {type === "activity" && (
          <>
            <div className="flex flex-col gap-1">
              {totalQuestions} <span>Questions</span>
            </div>
            <div className="flex flex-col gap-1">
              {totalAnswers} <span>Answers</span>
            </div>
          </>
        )}

        {type === "badge" && (
          <>
            <div className="flex flex-wrap items-center gap-4">
              {imgUrl && (
                <Image src={imgUrl} alt="badge" width={36} height={36} />
              )}
              <div className="flex flex-col gap-1">
                {badgeQuantity && <div>{badgeQuantity}</div>}
                {title && <div>{title}</div>}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default StatCard;
