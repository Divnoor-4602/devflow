"use client";

import React from "react";
import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";
import noResultDark from "../../public/assets/images/dark-illustration.png";
import noResultLight from "../../public/assets/images/light-illustration.png";

import Link from "next/link";

interface NoResultProps {
  text: string;
  subtext: string;
  buttonText: string;
  buttonLink: string;
}

const NoResult = ({ text, subtext, buttonText, buttonLink }): NoResultProps => {
  const { mode } = useTheme();
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6 sm:p-10 md:p-24">
        <Image
          src={mode === "dark" ? noResultDark : noResultLight}
          alt="No result"
          width={270}
          height={200}
        />
        <div className="h2-bold text-dark200_light900 text-center">{text}</div>
        <div className="body-regular text-dark500_light700 text-center">
          {subtext}
        </div>
        <Link
          className="primary-gradient rounded-lg px-4 py-3 text-white shadow-sm"
          href={`/${buttonLink}`}
        >
          {buttonText || "Ask a Question"}
        </Link>
      </div>
    </>
  );
};

export default NoResult;

// todo: Create component for question card, metrics and a tag component (leftSidebar and question card) for resuability
