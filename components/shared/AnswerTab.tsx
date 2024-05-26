import React from "react";
import { getUserAnswers } from "@/lib/actions/user.action";
import AnswerCard from "../cards/AnswerCard";

interface Props {
  userId: string;
  clerkId: string;
}

const AnswerTab = async ({ userId, clerkId }: Props) => {
  const result = await getUserAnswers({ userId, page: 1, pageSize: 10 });

  console.log(result);

  return (
    <>
      {result.answers.map((answer) => {
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
      })}
    </>
  );
};

export default AnswerTab;
