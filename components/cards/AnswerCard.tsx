import Link from "next/link";
import Image from "next/image";
import Metrics from "../shared/Metrics";
import { formatAndDivideNumber, getTimeStamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
// import EditDeleteAction from "../shared/EditDeleteAction";

interface Props {
  clerkId?: string | null;
  _id: string;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  createdAt: Date;
}

const AnswerCard = ({
  clerkId,
  _id,
  question,
  author,
  upvotes,
  createdAt,
}: Props) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <Link
      href={`/question/${question._id}/#${_id}`}
      className="dark:dark-gradient flex flex-col gap-6 rounded-lg bg-light-900 px-12 py-6 shadow-sm"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {question.title}
          </h3>
        </div>

        <SignedIn>
          {/* {showActionButtons && (
            <EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} />
          )} */}
        </SignedIn>
      </div>

      {/* answer card footer */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:gap-0">
        {/* answer author */}
        <div className="flex items-center gap-2">
          {/* profile image */}
          <Image
            src={author.picture}
            alt="Author profile picture"
            width={20}
            height={20}
            className="rounded-full object-contain object-center"
          />
          {/* author */}
          <div className="text-dark400_light700 body-medium">{author.name}</div>
          <div className="text-dark400_light700 small-regular hidden md:block">
            •
          </div>
          {/* time created */}
          <div className="small-regular text-dark400_light700 hidden md:block">
            {getTimeStamp(createdAt)}
          </div>
        </div>
        {/* Statistics */}
        <div className="flex flex-wrap gap-[9px]">
          <Metrics metricTitle="Votes" metricQuantity={upvotes} />
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;
