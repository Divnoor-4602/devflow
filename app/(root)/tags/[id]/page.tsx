import React from "react";
import { getQuestionByTagId } from "@/lib/actions/question.action";
import NoResult from "@/components/shared/NoResult";
import QuestionCards from "@/components/cards/QuestionCards";
import Link from "next/link";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { URLProps } from "@/types";
import Pagination from "@/components/shared/Pagination";

export default async function Page({ params, searchParams }: URLProps) {
  const result = await getQuestionByTagId({
    tagId: params.id,
    searchQuery: searchParams.q,
  });

  if (!result) return;

  return (
    <>
      <div className="h1-bold text-dark100_light900">{result.tagName}</div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholderText="Search by tag name..."
          otherClasses="flex-1"
        />
      </div>

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
      <div className="mt-10">
        <Pagination isNext={result.isNext} />
      </div>
    </>
  );
}
