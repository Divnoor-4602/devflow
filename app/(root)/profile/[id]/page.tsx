import React from "react";
import AnswerTab from "@/components/shared/AnswerTab";
import { getUserInfo } from "@/lib/actions/user.action";
import { getJoinedDate } from "@/lib/utils";
import calendarIcon from "../../../../public/assets/icons/calendar.svg";
import locationIcon from "../../../../public/assets/icons/location.svg";
import linkIcon from "../../../../public/assets/icons/link.svg";
import goldBadge from "../../../../public/assets/icons/gold-medal.svg";
import silverBadge from "../../../../public/assets/icons/silver-medal.svg";
import bronzeBadge from "../../../../public/assets/icons/bronze-medal.svg";
import Image from "next/image";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import StatCard from "../../../../components/cards/StatCard";
import QuestionTab from "../../../../components/shared/QuestionTab";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileLink from "@/components/shared/ProfileLink";
import { URLProps } from "@/types";

const Page = async ({ params }: URLProps) => {
  // check if the profile view is of the current logged in user
  const { userId: clerkId }: { userId: string | null } = auth();

  const result = await getUserInfo({ userId: params.id });

  if (!result) return console.log("User not found!");

  return (
    <div className="mt-6">
      <div className=" flex flex-col-reverse justify-between gap-4 sm:flex-row">
        <div className="flex flex-col gap-5  sm:flex-row sm:items-center">
          <Image
            src={result?.user.picture}
            alt="profile picture"
            height={140}
            width={140}
            className={`rounded-full ${
              params.id === clerkId && "border-[3px] border-primary-500"
            } object-cover`}
          />
          <div className="flex flex-col gap-4">
            <div className="h2-bold text-dark100_light900">
              {result.user.name}
            </div>
            <div className="text-dark200_light800 paragraph-regular leading-[22px]">
              @{result.user.username}
            </div>
            <div className="flex flex-wrap items-center justify-start gap-5">
              {/* website */}
              {result.user.portfolioWebsite && (
                <ProfileLink
                  imgUrl={linkIcon}
                  title="Portfolio"
                  href={result.user.portfolioWebsite}
                />
              )}
              {/* location */}
              {result.user.location && (
                <ProfileLink
                  imgUrl={locationIcon}
                  title={result.user.location}
                />
              )}
              {/* joined at */}
              <ProfileLink
                imgUrl={calendarIcon}
                title={getJoinedDate(result.user.joinedAt.toString())}
              />
            </div>
          </div>
        </div>
        <SignedIn>
          {clerkId === result.user.clerkId && (
            <Link
              href={`/profile/edit/${clerkId}`}
              className="flex justify-end"
            >
              <Button className="background-light800_dark400 text-dark300_light900 paragraph-medium min-h-[46px] min-w-[175px] px-3 py-4">
                Edit Profile
              </Button>
            </Link>
          )}
        </SignedIn>
      </div>
      {/* Stats */}

      <div className="h3-semibold text-dark200_light900 mt-10">Stats</div>
      <div className="mt-6 grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-4">
        <StatCard
          totalQuestions={result.totalQuestions}
          totalAnswers={result.totalAnswers}
          type="activity"
        />
        <StatCard
          type="badge"
          imgUrl={goldBadge}
          title="Gold Badges"
          badgeQuantity={result.badges.GOLD}
        />
        <StatCard
          type="badge"
          imgUrl={silverBadge}
          title="Silver Badges"
          badgeQuantity={result.badges.SILVER}
        />
        <StatCard
          type="badge"
          imgUrl={bronzeBadge}
          title="Bronze Badges"
          badgeQuantity={result.badges.BRONZE}
        />
      </div>

      {/* answer / top post toggle switch */}

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark300 min-h-[42px] min-w-[107px] rounded-r-lg  ">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts" className="mt-6">
            <QuestionTab userId={params.id} clerkId={clerkId!} />
          </TabsContent>
          <TabsContent value="answers" className="mt-6">
            <AnswerTab userId={params.id} clerkId={clerkId!} />
          </TabsContent>
        </Tabs>
      </div>

      {/* top posts */}
    </div>
  );
};

export default Page;
