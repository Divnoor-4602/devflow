import Link from "next/link";
import { Button } from "@/components/ui/button";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import LocalSelectFilter from "@/components/shared/filter/LocalSelectFilter";
import HomeFilterBadges from "@/components/shared/filter/HomeFilterBadges";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import QuestionCards from "@/components/cards/QuestionCards";
import { getQuestions } from "@/lib/actions/question.action";
import { Metadata } from "next";
import { HomePageFilters } from "@/constants";
import { SearchParamsProps } from "@/types";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) {
  const result = await getQuestions({
    page: searchParams.page || 1,
    pageSize: 10,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });

  return (
    <>
      <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link
          href={"/ask-question"}
          className="flex justify-end max-sm:w-full "
        >
          <Button className="primary-gradient min-h-[46px] px-4 py-3 text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      {/* searchbar and filters */}

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholderText="Search questions"
          otherClasses="flex-1"
        />

        <LocalSelectFilter
          filterList={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilterBadges
        filterList={["Newest", "Reccomended", "Frequent", "Unanswered"]}
      />

      {/* Question cards */}
      <div className="mt-10 flex flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question) => {
            // calculating time asked since the question was asked

            return (
              <>
                <Link href={`/question/${question._id}`}>
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
              text="There's no question to show"
              subtext="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
              buttonText="Ask a Question"
              buttonLink="ask-question"
            />
          </>
        )}
      </div>
      <div className="mt-10 w-full">
        <Pagination isNext={result.isNext} />
      </div>
    </>
  );
}
