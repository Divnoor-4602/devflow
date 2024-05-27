import React from "react";
import { getUserAnswers } from "@/lib/actions/user.action";
import AnswerCard from "../cards/AnswerCard";
import NoResult from "./NoResult";

interface Props {
  userId: string;
  clerkId: string;
}

const AnswerTab = async ({ userId, clerkId }: Props) => {
  const result = await getUserAnswers({ userId, page: 1, pageSize: 10 });

  console.log(result);

  return (
    <>
      {result.answers.length > 0 ? (
        result.answers.map((answer) => {
          return (
            <>
              <AnswerCard
                key={answer._id}
                clerkId={clerkId!}
                _id={answer._id}
                question={answer.question}
                author={answer.author}
                upvotes={answer.upvotes.length}
                createdAt={answer.createdAt}
              />
            </>
          );
        })
      ) : (
        <>
          <NoResult
            text="There are no answers to show"
            subtext="Break the silence! 🚀 Answer a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            buttonText="Answer a Question"
            buttonLink=""
          />
        </>
      )}
    </>
  );
};

export default AnswerTab;
