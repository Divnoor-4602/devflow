"use client";
import React from "react";
import upvoteIcon from "../../public/assets/icons/upvote.svg";
import upvotedIcon from "../../public/assets/icons/upvoted.svg";
import downvoteIcon from "../../public/assets/icons/downvote.svg";
import downvotedIcon from "../../public/assets/icons/downvoted.svg";
import starRed from "../../public/assets/icons/star-red.svg";
import starRedFilled from "../../public/assets/icons/star-filled.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  upvoteQuestion,
  downvoteQuestion,
} from "@/lib/actions/question.action";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answers.action";

interface Props {
  item: string;
  itemId: string;
  userId: string;
  numUpvotes: number;
  numDownvotes: number;
  upvoted: boolean;
  downvoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  item,
  itemId,
  userId,
  numUpvotes,
  numDownvotes,
  upvoted,
  downvoted,
  hasSaved,
}: Props) => {
  const path = usePathname();

  const handleSave = () => {};

  const handleVote = async (action: string) => {
    if (!userId) {
      return;
    }

    if (action === "upvote") {
      if (item === "question") {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: upvoted,
          hasdownVoted: downvoted,
          path,
        });
      } else if (item === "answer") {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: upvoted,
          hasdownVoted: downvoted,
          path,
        });
      }

      // todo: show a toast
    }

    if (action === "downvote") {
      if (item === "question") {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: upvoted,
          hasdownVoted: downvoted,
          path,
        });
      } else if (item === "answer") {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: upvoted,
          hasdownVoted: downvoted,
          path,
        });
      }

      // todo: show a toast
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Image
            src={upvoted ? upvotedIcon : upvoteIcon}
            alt="upvote icon"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => {
              handleVote("upvote");
            }}
          />
          <div className="subtle-medium text-dark400_light900 background-light700_dark400 flex items-center justify-center rounded p-1">
            {numUpvotes}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={downvoted ? downvotedIcon : downvoteIcon}
            alt="downvote icon"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => {
              handleVote("downvote");
            }}
          />
          <div className="subtle-medium text-dark400_light900 background-light700_dark400 flex items-center justify-center rounded p-1">
            {numDownvotes}
          </div>
        </div>
        {item === "question" && (
          <Image
            src={hasSaved ? starRedFilled : starRed}
            alt="save icon"
            width={18}
            height={18}
            onClick={() => {}}
          />
        )}
      </div>
    </>
  );
};

export default Votes;