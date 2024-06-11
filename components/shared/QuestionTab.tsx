import React from "react";
import { getUserQuestions } from "@/lib/actions/user.action";
import QuestionCards from "../cards/QuestionCards";
import NoResult from "./NoResult";

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
      <div className="flex flex-col gap-6">
        {userQuestions.questions.length > 0 ? (
          userQuestions.questions.map((question) => {
            return (
              <>
                <QuestionCards
                  _id={question._id}
                  key={question._id}
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
              </>
            );
          })
        ) : (
          <>
            <NoResult
              text="There's no question to show"
              subtext="Break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
              buttonText="Ask a Question"
              buttonLink="ask-question"
            />
          </>
        )}
      </div>
    </>
  );
};

export default QuestionTab;
