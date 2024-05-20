import React from "react";
import LocalSelectFilter from "./filter/LocalSelectFilter";
import { answerFilters } from "@/constants";
import { getAnswers } from "@/lib/actions/answers.action";
import Link from "next/link";
import Image from "next/image";
import { getTimeStamp } from "@/lib/utils";

import ParseHTML from "./ParseHTML";
import Votes from "./Votes";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const result = await getAnswers({ questionId });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between ">
        <div className="primary-text-gradient">{totalAnswers} Answers</div>
        <LocalSelectFilter
          filterList={answerFilters}
          containerClasses="min-h-[30px] sm:min-w-[170px]"
          otherClasses="flex gap-2"
        />
      </div>
      <div>
        {result.map((answer) => {
          return (
            <>
              <article key={answer._id} className="light-border border-b py-6 ">
                <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
                  <Link
                    href={`/profile/${answer.author.clerkId}`}
                    className="flex items-center gap-1"
                  >
                    <Image
                      src={answer.author.picture}
                      alt="author picture"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />

                    <div className="body-semibold text-dark300_light700">
                      {answer.author.name}{" "}
                      <span className="small-regular leading-[15px] text-light-400 dark:text-light-500">
                        • answered {getTimeStamp(answer.createdAt)}
                      </span>
                    </div>
                  </Link>
                  {/* upvotes / downvotes / fav */}
                  <div className="flex items-center justify-end">
                    <Votes />
                  </div>
                </div>
                <div className="mt-6">
                  <ParseHTML data={answer.content} />
                </div>
              </article>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default AllAnswers;
