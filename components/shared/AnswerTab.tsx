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
      {result.userAnswers.map((answer) => {
        return <></>;
      })}
    </>
  );
};

export default AnswerTab;
