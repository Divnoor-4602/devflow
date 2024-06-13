import React from "react";
import Image from "next/image";
import TagHolder from "../shared/TagHolder";
import { getTopInteractedTags } from "@/lib/actions/tag.actions";

interface ProfileCardProps {
  _id: string;
  name: string;
  picture: string;
  //   tags: {
  //     _id: string;
  //     name: string;
  //   }[];
  username: string;
}

const UserCard = async ({ _id, name, picture, username }: ProfileCardProps) => {
  const interactedTags = await getTopInteractedTags({ userId: _id });

  return (
    <>
      <div className="background-light900_dark200 shadow-light100_dark100 light-border flex w-[260px] cursor-pointer flex-col items-center gap-4 rounded-[10px] border p-8">
        <Image
          src={picture}
          alt="profile picture"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="h3-bold text-dark200_light900 line-clamp-1">{name}</div>
        {username ? (
          <div className="body-regular text-dark-400 dark:text-light-500">
            @{username}
          </div>
        ) : (
          <>
            <div className="body-regular text-dark-400 dark:text-light-500">
              @
            </div>
          </>
        )}
        {/* tags */}
        <div className="flex items-center gap-2">
          {interactedTags.length > 0 ? (
            interactedTags.map((tag) => {
              return (
                <>
                  <TagHolder tagName={tag.tagName} key={tag.tagName} />
                </>
              );
            })
          ) : (
            <>
              <TagHolder tagName="No tags yet" />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserCard;
