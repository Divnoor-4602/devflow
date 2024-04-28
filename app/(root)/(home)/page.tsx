import Link from "next/link";
import { Button } from "@/components/ui/button";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import LocalSelectFilter from "@/components/shared/filter/LocalSelectFilter";
import HomeFilterBadges from "@/components/shared/filter/HomeFilterBadges";

const questions = [
  {
    _id: 1,
    question:
      "The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this",
    tags: ["javascript", "react", "next"],
    author: "John Doe",
    upvotes: 10,
    views: 100,
    answers: 3,
    createdAt: "2021-09-01T00:00:00.000Z",
  },
  {
    _id: 2,
    question: "How to use hooks in React?",
    tags: ["react", "hooks"],
    author: "Jane Smith",
    upvotes: 5,
    views: 50,
    answers: 2,
    createdAt: "2021-09-02T00:00:00.000Z",
  },
  {
    _id: 3,
    question:
      "What is the difference between var, let, and const in JavaScript?",
    tags: ["javascript"],
    author: "Bob Johnson",
    upvotes: 8,
    views: 80,
    answers: 4,
    createdAt: "2021-09-03T00:00:00.000Z",
  },
  {
    _id: 4,
    question: "How to handle form submission in React?",
    tags: ["react", "forms"],
    author: "Alice Brown",
    upvotes: 3,
    views: 30,
    answers: 1,
    createdAt: "2021-09-04T00:00:00.000Z",
  },
  {
    _id: 5,
    question: "What are the best practices for writing clean code?",
    tags: ["programming", "best practices"],
    author: "David Wilson",
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
      <div className="mt-10 flex flex-col gap-6"></div>
    </>
  );
}
