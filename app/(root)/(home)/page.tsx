import Link from "next/link";
import { Button } from "@/components/ui/button";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import LocalSelectFilter from "@/components/shared/filter/LocalSelectFilter";
import HomeFilterBadges from "@/components/shared/filter/HomeFilterBadges";
import NoResult from "@/components/shared/NoResult";
import Image from "next/image";
import pfp from "../../../public/assets/images/pfpExample.jpeg";
import likeIcon from "../../../public/assets/icons/like.svg";
import commentIcon from "../../../public/assets/icons/message.svg";
import eyeIcon from "../../../public/assets/icons/eye.svg";

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
    createdAt: "2023-09-01T00:00:00.000Z",
  },
  {
    _id: 2,
    question: "How to use hooks in React?",
    tags: ["react", "hooks"],
    author: "Jane Smith",
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
      <div className="mt-10 flex flex-col gap-6">
        {questions.length !== 0 ? (
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
                {/* question box */}
                <div
                  className="dark:dark-gradient flex flex-col gap-6 rounded-lg bg-light-900 px-12 py-6 shadow-sm"
                  key={question._id}
                >
                  {/* header */}
                  <div className="flex flex-col gap-[14px]">
                    {/* h3 question text */}
                    <div className="base-semibold sm:h3-semibold text-dark200_light900 line-clamp-1">
                      {question.question}
                    </div>
                    {/* tags */}
                    <div className="flex w-full gap-2">
                      {question.tags.map((tag) => {
                        return (
                          <>
                            <div
                              key={tag}
                              className="background-light800_dark300 subtle-medium flex w-fit items-center rounded-lg px-4 py-2 uppercase text-light-400 shadow-md dark:text-light-500"
                            >
                              {tag}
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                  {/* question card footer */}
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:gap-0">
                    {/* question author */}
                    <div className="flex items-center gap-2">
                      {/* profile image */}
                      <Image
                        src={pfp}
                        alt="totoro image"
                        width={20}
                        height={20}
                        className="rounded-full object-contain object-center"
                      />
                      {/* author */}
                      <div className="text-dark400_light700 body-medium">
                        {question.author}
                      </div>
                      <div className="text-dark400_light700 small-regular hidden md:block">
                        •
                      </div>
                      {/* time created */}
                      <div className="small-regular text-dark400_light700 hidden md:block">
                        asked {Math.floor(timePassed / (24 * 60 * 60 * 1000))}{" "}
                        days ago
                      </div>
                    </div>
                    {/* Statistics */}
                    <div className="flex flex-wrap gap-[9px]">
                      <div className="flex items-center gap-1">
                        <Image src={likeIcon} alt="like icon" />
                        <div className="text-dark400_light700 small-regular">
                          {question.upvotes} Votes
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Image src={commentIcon} alt="like icon" />
                        <div className="text-dark400_light700 small-regular">
                          {question.answers} Answers
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Image src={eyeIcon} alt="like icon" />
                        <div className="text-dark400_light700 small-regular">
                          {question.views} Views
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        )}
      </div>
    </>
  );
}
