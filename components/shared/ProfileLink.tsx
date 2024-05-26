import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  imgUrl: string;
  href?: string;
  title: string;
}

const ProfileLink = ({ imgUrl, title, href }: Props) => {
  return (
    <>
      <div className="flex items-center gap-1">
        <Image src={imgUrl} height={20} width={20} alt="profile icon" />
        {href ? (
          <Link
            href={href}
            target="_blank"
            className="paragraph-medium text-blue-500"
          >
            {title}
          </Link>
        ) : (
          <p className="paragraph-medium text-dark400_light700">{title}</p>
        )}
      </div>
    </>
  );
};

export default ProfileLink;
