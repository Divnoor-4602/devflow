import React from "react";
import Question from "@/components/forms/Question";

const Page = () => {
  return (
    <div>
      <div>
        <div className="h1-bold text-dark100_light900">Ask a Question</div>
        <div className="mt-9">
          {/* Question form */}
          <Question />
        </div>
      </div>
    </div>
  );
};

export default Page;
