import React from "react";
import { getSavedQuestion } from "@/lib/actions/question.action";
import { auth } from "@clerk/nextjs/server";
import QuestionCards from "@/components/cards/QuestionCards";
import Link from "next/link";
import NoResult from "@/components/shared/NoResult";

const page = async () => {
  const { userId }: { userId: string | null } = auth();

  if (!userId) return null;

  const savedQuestions = await getSavedQuestion({ clerkId: userId });

  return (
    <>
      <div className="h1-bold text-dark100_light900">Saved Questions</div>
      {/* all saved questions */}
      <div className="mt-9 flex flex-col gap-6">
        {savedQuestions.questions.length > 0 ? (
          savedQuestions.questions.map((question: any) => {
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
              text="No questions were saved!"
              subtext="Save your favourite questions to quickly refer back to them whenever requried! 🥶"
              buttonText="Go to Questions"
              buttonLink=""
            />
          </>
        )}
      </div>
    </>
  );
};

export default page;
