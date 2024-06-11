import React from "react";
import Question from "@/components/forms/Question";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.action";
import { getQuestionById } from "@/lib/actions/question.action";

const Page = async ({ params }: { params: { questionId: string } }) => {
  const question = await getQuestionById({ questionId: params.questionId });

  console.log(question);

  const { userId: clerkId } = auth();

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 mt-9">Edit a question</h1>
      <Question
        type="edit"
        mongoUserId={JSON.stringify(mongoUser._id)}
        questionDetails={JSON.stringify(question)}
      />
    </>
  );
};

export default Page;
