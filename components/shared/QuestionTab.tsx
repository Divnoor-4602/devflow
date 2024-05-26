import React from "react";
import { getUserQuestions } from "@/lib/actions/user.action";
import QuestionCards from "../cards/QuestionCards";
import Link from "next/link";

interface Props {
  userId: string;
  clerkId: string;
}

const QuestionTab = async ({ userId, clerkId }: Props) => {
  const userQuestions = await getUserQuestions({
    userId,
    pageSize: 10,
    page: 1,
  });

  return (
    <>
      {userQuestions.questions.map((question) => {
        return (
          <>
            <Link href={`/question/${question._id}`} key={question._id}>
              <QuestionCards
                _id={question._id}
                clerkId={clerkId!}
                title={question.title}
                author={question.author}
                content={question.content}
                tags={question.tags}
                upvotes={question.upvotes.length}
                views={question.views}
                answers={question.answers.length}
                createdAt={question.createdAt}
              />
            </Link>
          </>
        );
      })}
    </>
  );
};

export default QuestionTab;
