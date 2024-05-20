import React from "react";
import Image from "next/image";
import likeIcon from "../../public/assets/icons/like.svg";
import answerIcon from "../../public/assets/icons/message.svg";
import viewIcon from "../../public/assets/icons/eye.svg";
import { formatAndDivideNumber } from "@/lib/utils";

interface MetricsProps {
  metricTitle: string;
  metricQuantity: number;
}

const Metrics = ({ metricTitle, metricQuantity }: MetricsProps) => {
  let icon;
  if (metricTitle.toLowerCase() === "votes") {
    icon = likeIcon;
  } else if (metricTitle.toLowerCase() === "answers") {
    icon = answerIcon;
  } else {
    icon = viewIcon;
  }
  return (
    <>
      <div className="flex items-center gap-1">
        <Image src={icon} alt="icon" />
        <div className="text-dark400_light700 small-regular">
          {metricQuantity} {metricTitle}
        </div>
      </div>
    </>
  );
};

export default Metrics;
