import React from "react";
import Image from "next/image";
import TagHolder from "../shared/TagHolder";

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

const tags = [
  {
    tagName: "HTML",
  },
  {
    tagName: "REACT",
  },
  {
    tagName: "CSS",
  },
];

const UserCard = ({ _id, name, picture, username }: ProfileCardProps) => {
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
        <div className="h3-bold text-dark200_light900">{name}</div>
        {username && (
          <div className="body-regular text-dark-400 dark:text-light-500">
            @{username}
          </div>
        )}
        {/* tags */}
        <div className="flex items-center gap-2">
          {tags.length > 0 ? (
            tags.map((tag) => {
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
