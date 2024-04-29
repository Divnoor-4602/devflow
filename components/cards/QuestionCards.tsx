import React from "react";
import pfp from "../../public/assets/images/pfpExample.jpeg";
import Image from "next/image";
import TagHolder from "../shared/TagHolder";
import Metrics from "../shared/Metrics";
import { Metric } from "@/types";

interface QuestionCardsProps {
  question: string;
  author: string;
  timePassed: number;
  metrics: Metric[];
  tags: string[];
}

const QuestionCards = ({
  question,
  author,
  timePassed,
  metrics,
  tags,
}: QuestionCardsProps) => {
  return (
    <>
      {/* question box */}
      <div className="dark:dark-gradient flex flex-col gap-6 rounded-lg bg-light-900 px-12 py-6 shadow-sm">
        {/* header */}
        <div className="flex flex-col gap-[14px]">
          {/* h3 question text */}
          <div className="base-semibold sm:h3-semibold text-dark200_light900 line-clamp-1">
            {question}
          </div>
          {/* tags */}
          <div className="flex w-full gap-2">
            {tags.map((tag) => {
              return (
                <React.Fragment key={tag}>
                  <TagHolder tagName={tag} />
                </React.Fragment>
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
            <div className="text-dark400_light700 body-medium">{author}</div>
            <div className="text-dark400_light700 small-regular hidden md:block">
              •
            </div>
            {/* time created */}
            <div className="small-regular text-dark400_light700 hidden md:block">
              asked {Math.floor(timePassed / (24 * 60 * 60 * 1000))} days ago
            </div>
          </div>
          {/* Statistics */}
          <div className="flex flex-wrap gap-[9px]">
            {metrics &&
              metrics.map((metric) => {
                return (
                  <>
                    <div>
                      <Metrics
                        metricTitle={metric.metricTitle}
                        metricQuantity={metric.metricQuantity}
                      />
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCards;
