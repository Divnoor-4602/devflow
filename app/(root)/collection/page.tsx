import React from "react";
import { getSavedQuestion } from "@/lib/actions/question.action";
import { auth } from "@clerk/nextjs/server";
import QuestionCards from "@/components/cards/QuestionCards";
import Link from "next/link";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import NoResult from "@/components/shared/NoResult";
import LocalSelectFilter from "@/components/shared/filter/LocalSelectFilter";
import { HomePageFilters } from "@/constants";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Save and organize your favorite prog{{{ramming questions on DevFlow. Create collections to easily access and manage the most helpful answers and resources from the developer community. Join DevFlow today and streamline your coding journey!",
};

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) {
  const { userId }: { userId: string | null } = auth();

  if (!userId) return null;

  const savedQuestions = await getSavedQuestion({
    clerkId: userId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: Number(searchParams.page) || 1,
    pageSize: 10,
  });

  return (
    <>
      <div className="h1-bold text-dark100_light900">Saved Questions</div>
      {/* local search bar */}
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/collection"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholderText="Search any question"
          otherClasses="flex-1"
        />

        <LocalSelectFilter
          filterList={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="flex"
        />
      </div>
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
      <div className="mt-10">
        <Pagination isNext={savedQuestions.isNext} />
      </div>
    </>
  );
}
