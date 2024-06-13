"use client";
import React, { useEffect } from "react";
import upvoteIcon from "../../public/assets/icons/upvote.svg";
import upvotedIcon from "../../public/assets/icons/upvoted.svg";
import downvoteIcon from "../../public/assets/icons/downvote.svg";
import downvotedIcon from "../../public/assets/icons/downvoted.svg";
import starRed from "../../public/assets/icons/star-red.svg";
import starRedFilled from "../../public/assets/icons/star-filled.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { viewQuestion } from "@/lib/actions/interaction.action";

import {
  upvoteQuestion,
  downvoteQuestion,
  toggleSaveQuestion,
} from "@/lib/actions/question.action";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answers.action";
import { toast } from "sonner";

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
  const router = useRouter();

  const handleSave = async () => {
    if (!userId) {
      return;
    }

    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path,
    });
  };

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

      upvoted ? toast("Removed upvote") : toast("Upvoted 👍");
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

      downvoted ? toast("Removed downvote") : toast("Downvoted 👎");
    }
  };

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemId, userId, path, router]);

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
            className="cursor-pointer"
            onClick={() => {
              handleSave();
            }}
          />
        )}
      </div>
    </>
  );
};

export default Votes;
