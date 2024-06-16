import React from "react";
import imgSrc from "../../public/assets/images/default-logo.svg";
import clock from "../../public/assets/icons/clock.svg";
import money from "../../public/assets/icons/currency-dollar-circle.svg";
import arrowUp from "../../public/assets/icons/arrow-up-right.svg";
import Image from "next/image";
import Link from "next/link";
import { formatNumberToK } from "@/lib/utils";

interface JobCardProps {
  title: string;
  action: string;
  location: string;
  description: string;
  salary: string;
  image: string | null;
  locationImage: string;
  jobGoogleLink: string;
  type: string;
}

const JobCard = ({
  title,
  action,
  location,
  description,
  salary,
  image,
  locationImage,
  jobGoogleLink,
  type,
}: JobCardProps) => {
  const capitalize = (item: string) => {
    return item[0].toUpperCase() + item.slice(1).toLowerCase();
  };

  return (
    <>
      <div className="background-light900_dark200 rounded-lg p-[30px] light-border border shadow-light100_darknone">
        <div className="flex gap-6 items-start">
          <Image
            alt="job profile image"
            width={64}
            height={64}
            src={image || imgSrc}
            className="rounded-xl object-center object-contain"
          />

          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-3">
              <div className="items-start md:items-center flex flex-col md:flex-row justify-between gap-2">
                <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                  <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1">
                    {title}
                  </h3>
                  <div className="rounded-md px-[14px] py-[7px] background-light800_dark400 subtle-medium text-[10px] leading-3 uppercase text-light-500">
                    {action}
                  </div>
                </div>
                <div className="background-light800_dark400 rounded-2xl py-0.5 pr-[10px] pl-1 body-medium text-dark400_light700 flex items-center gap-1">
                  <Image
                    src={`https://flagcdn.com/48x36/${locationImage.toLowerCase()}.png`}
                    height={20}
                    width={20}
                    alt="flag"
                    className="rounded-full object-cover"
                  />{" "}
                  <span className="line-clamp-1">{location}</span>
                </div>
              </div>
              <div className="text-dark500_light700 line-clamp-3 body-regular w-2/3">
                {description}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  <Image
                    src={clock}
                    alt="clock icon"
                    width={16}
                    height={16}
                    className="invert-colors"
                  />
                  <div className="text-light-500 body-medium">
                    {capitalize(type)}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Image
                    src={money}
                    alt="money icon"
                    width={16}
                    height={16}
                    className="invert-colors"
                  />
                  <div className="text-light-500 body-medium">
                    {formatNumberToK(Number(salary))}
                  </div>
                </div>
              </div>
              <Link
                className="primary-text-gradient body-semibold flex items-center gap-2 cursor-pointer"
                href={jobGoogleLink}
              >
                <span className="hidden sm:block">View job</span>
                <Image
                  src={arrowUp}
                  alt="arrow up right"
                  width={20}
                  height={20}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobCard;
