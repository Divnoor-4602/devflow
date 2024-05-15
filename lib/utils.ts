import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();

  const millisecondsElapsed = now.getTime() - createdAt.getTime();
  const secondsElapsed = Math.floor(millisecondsElapsed / 1000);
  const minutesElapsed = Math.floor(secondsElapsed / 60);
  const hoursElapsed = Math.floor(minutesElapsed / 60);
  const daysElapsed = Math.floor(hoursElapsed / 24);
  const weeksElapsed = Math.floor(daysElapsed / 7);
  const monthsElapsed = Math.floor(daysElapsed / 30);
  const yearsElapsed = Math.floor(daysElapsed / 365);

  if (yearsElapsed > 0) {
    return yearsElapsed === 1 ? "1 year ago" : `${yearsElapsed} years ago`;
  } else if (monthsElapsed > 0) {
    return monthsElapsed === 1 ? "1 month ago" : `${monthsElapsed} months ago`;
  } else if (weeksElapsed > 0) {
    return weeksElapsed === 1 ? "1 week ago" : `${weeksElapsed} weeks ago`;
  } else if (daysElapsed > 0) {
    return daysElapsed === 1 ? "1 day ago" : `${daysElapsed} days ago`;
  } else if (hoursElapsed > 0) {
    return hoursElapsed === 1 ? "1 hour ago" : `${hoursElapsed} hours ago`;
  } else if (minutesElapsed > 0) {
    return minutesElapsed === 1
      ? "1 minute ago"
      : `${minutesElapsed} minutes ago`;
  } else {
    return secondsElapsed <= 1 ? "just now" : `${secondsElapsed} seconds ago`;
  }
};
