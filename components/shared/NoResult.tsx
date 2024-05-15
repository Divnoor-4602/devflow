"use client";

import React from "react";
import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";
import noResultDark from "../../public/assets/images/dark-illustration.png";
import noResultLight from "../../public/assets/images/light-illustration.png";
import { Button } from "../ui/button";

const NoResult = () => {
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
        <div className="h2-bold text-dark200_light900 text-center">
          There's nothing to show
        </div>
        <div className="body-regular text-dark500_light700 text-center">
          Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from.
          Get involved! 💡
        </div>
        <Button className="primary-gradient rounded-lg px-4 py-3 text-white shadow-sm">
          Ask a Question
        </Button>
      </div>
    </>
  );
};

export default NoResult;

// todo: Create component for question card, metrics and a tag component (leftSidebar and question card) for resuability
