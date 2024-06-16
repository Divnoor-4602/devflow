import React from "react";
import JobPage from "@/components/shared/JobPage";

export default async function Page() {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>
      {/* local search bar and local job filters */}
      <JobPage />
    </>
  );
}
