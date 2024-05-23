import React from "react";
import Image from "next/image";
import { getQuestionById } from "@/lib/actions/question.action";
import Metrics from "@/components/shared/Metrics";
import ParseHTML from "@/components/shared/ParseHTML";
import TagHolder from "@/components/shared/TagHolder";
import Answer from "@/components/forms/Answer";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.action";
import Votes from "@/components/shared/Votes";
import AllAnswers from "@/components/shared/AllAnswers";

const page = async ({ params }: { params: { questionId: string } }) => {
  const question = await getQuestionById({ questionId: params.questionId });

  const { userId: clerkId } = auth();

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  return (
    <>
      <div className="mt-9">
        {/* question header */}
        <div className="mb-8 flex flex-col gap-[18px]">
          {/* author name and picture */}
          <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-1">
              <Image
                src={question.author.picture}
                alt="author profile picture"
                width={22}
                height={22}
                className="rounded-full"
              />
              <div className="paragraph-semibold text-dark300_light700">
                {question.author.name}
              </div>
            </div>
            {/* upvotes downvotes and save */}
            <div className="flex justify-end">
              <Votes
                item="question"
                itemId={JSON.stringify(question._id)}
                userId={JSON.stringify(mongoUser._id)}
                numUpvotes={question.upvotes.length}
                numDownvotes={question.downvotes.length}
                upvoted={question.upvotes.includes(mongoUser._id)}
                downvoted={question.downvotes.includes(mongoUser._id)}
                hasSaved={mongoUser?.saved.includes(question._id)}
              />
            </div>
          </div>
          {/* question title */}
          <div className="h2-semibold text-dark200_light900 leading-[31px]">
            {question.title}
          </div>
          {/* metrics */}
          <div className="flex flex-wrap items-center gap-[15px]">
            <Metrics
              metricTitle="Votes"
              metricQuantity={question.upvotes.length}
            />
            <Metrics
              metricTitle="Answers"
              metricQuantity={question.answers.length}
            />
            <Metrics metricTitle="Views" metricQuantity={question.views} />
          </div>
        </div>
        <ParseHTML data={question.content} />
        <div className="mt-8 flex gap-4">
          {/* tags */}
          {question.tags.length > 0 &&
            question.tags.map((tag: any) => {
              return (
                <>
                  <TagHolder tagName={tag.name} key={tag.name} />
                </>
              );
            })}
        </div>

        {/* all answers */}
        <AllAnswers
          questionId={question._id}
          userId={mongoUser._id}
          totalAnswers={question.answers.length}
        />

        {/* answer form */}
        <div>
          <Answer
            question={question.content}
            questionId={JSON.stringify(question._id)}
            authorId={JSON.stringify(mongoUser._id)}
          />
        </div>
      </div>
    </>
  );
};

export default page;
