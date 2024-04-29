import Link from "next/link";
import { Button } from "@/components/ui/button";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import LocalSelectFilter from "@/components/shared/filter/LocalSelectFilter";
import HomeFilterBadges from "@/components/shared/filter/HomeFilterBadges";
import NoResult from "@/components/shared/NoResult";
import Image from "next/image";
import pfp from "../../../public/assets/images/pfpExample.jpeg";

import QuestionCards from "@/components/cards/QuestionCards";

const questions = [
  {
    _id: 1,
    question:
      "The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this",
    tags: ["javascript", "react", "next"],
    author: "John Doe",
    metrics: [
      { metricTitle: "Votes", metricQuantity: 10 },
      { metricTitle: "Answers", metricQuantity: 3 },
      { metricTitle: "Views", metricQuantity: 100 },
    ],
    upvotes: 5,
    views: 50,
    answers: 2,
    createdAt: "2023-09-02T00:00:00.000Z",
  },
  {
    _id: 3,
    question:
      "What is the difference between var, let, and const in JavaScript?",
    tags: ["javascript"],
    author: "Bob Johnson",
    metrics: [
      { metricTitle: "Votes", metricQuantity: 10 },
      { metricTitle: "Answers", metricQuantity: 3 },
      { metricTitle: "Views", metricQuantity: 100 },
    ],
    upvotes: 8,
    views: 80,
    answers: 4,
    createdAt: "2024-01-03T00:00:00.000Z",
  },
  {
    _id: 4,
    question: "How to handle form submission in React?",
    tags: ["react", "forms"],
    author: "Alice Brown",
    upvotes: 3,
    metrics: [
      { metricTitle: "Votes", metricQuantity: 10 },
      { metricTitle: "Answers", metricQuantity: 3 },
      { metricTitle: "Views", metricQuantity: 100 },
    ],
    views: 30,
    answers: 1,
    createdAt: "2021-09-04T00:00:00.000Z",
  },
  {
    _id: 5,
    question: "What are the best practices for writing clean code?",
    tags: ["programming", "best practices"],
    author: "David Wilson",
    metrics: [
      { metricTitle: "Votes", metricQuantity: 10 },
      { metricTitle: "Answers", metricQuantity: 3 },
      { metricTitle: "Views", metricQuantity: 100 },
    ],
    upvotes: 12,
    views: 120,
    answers: 6,
    createdAt: "2021-09-05T00:00:00.000Z",
  },
];

export default function Home() {
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
          route="/"
          filterList={["Newest", "Reccomended", "Frequent", "Unanswered"]}
        />
      </div>
      <HomeFilterBadges
        filterList={["Newest", "Reccomended", "Frequent", "Unanswered"]}
      />

      {/* Question cards */}
      <div className="mt-10 flex flex-col gap-6">
        {questions.length === 0 ? (
          <>
            <NoResult />
          </>
        ) : (
          questions.map((question) => {
            // calculating time asked since the question was asked
            const timeRightNow = new Date().getTime();
            const timeAsked = new Date(question.createdAt).getTime();
            const timePassed = timeRightNow - timeAsked;

            return (
              <>
                <QuestionCards
                  question={question.question}
                  author={question.author}
                  timePassed={timePassed}
                  metrics={question.metrics}
                  tags={question.tags}
                />
              </>
            );
          })
        )}
      </div>
    </>
  );
}
