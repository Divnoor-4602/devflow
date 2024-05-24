import React from "react";
import { getQuestionByTagId } from "@/lib/actions/question.action";
import NoResult from "@/components/shared/NoResult";
import QuestionCards from "@/components/cards/QuestionCards";
import Link from "next/link";

const page = async ({ params }: { params: { tagId: string } }) => {
  const result = await getQuestionByTagId({ tagId: params.tagId });

  if (!result) return;

  return (
    <>
      <div className="h1-bold text-dark100_light900">{result.tagName}</div>
      <div className="mt-9 flex flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => {
            return (
              <>
                <Link href={`/question/${question._id}`} key={question._id}>
                  <QuestionCards
                    _id={question._id}
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
          })
        ) : (
          <>
            <NoResult
              text="No questions were asked with this tag!"
              subtext="Spark some discussion 🧨 be the first one to ask a question on this topic✨!"
              buttonText="Ask a Question"
              buttonLink="ask-question"
            />
          </>
        )}
      </div>
    </>
  );
};

export default page;
