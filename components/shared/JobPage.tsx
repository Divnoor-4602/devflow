"use client";

import React, { useEffect, useState } from "react";
import JobSearchBar from "./search/JobSearchBar";
import JobFilter from "./filter/JobFilter";
import JobCard from "../cards/JobCard";
import { useSearchParams } from "next/navigation";
import SkeletonCard from "../cards/SkeletonCard";
import { Button } from "../ui/button";
import { toast } from "sonner";
import NoResult from "./NoResult";

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const jobQuery = searchParams.get("query") || "";
  const location = searchParams.get("location") || "";
  const page = searchParams.get("page") || "";

  const getJobs = async (query: string, page: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/jsearch?query=${query}&page=${page}`
      );

      const responseData = await response.json();

      setJobs((prev) => responseData);
    } catch (error) {
      toast.error("Could not fetch jobs right now, try later 😥");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getInitialJobs = async () => {
      try {
        setIsLoading(true);
        const locationResponse = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ipapi`
        );

        const location = await locationResponse.json();

        await getJobs(
          `NextJS jobs in ${location.data.city || "Chandigarh"}, ${
            location.data.country_name || "India"
          }`,
          "1"
        );
      } catch (error) {
        toast.error("Could not fetch jobs right now, try later 😥");
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    getInitialJobs();
  }, []);

  return (
    <>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col-reverse sm:items-center">
        <div className="flex flex-col md:flex-row items-center w-full gap-5">
          <JobSearchBar otherClasses="flex-1" route="/jobs" />
          <JobFilter />
        </div>
        <Button
          className="primary-gradient min-w-[170px] min-h-[56px] text-light-900 px-4 py-3 self-end"
          onClick={() => getJobs(`${jobQuery} in ${location}`, page)}
        >
          Find Jobs
        </Button>
      </div>
      {/* job postings */}
      <div className="mt-10 flex flex-col gap-6">
        {isLoading ? (
          <>
            <SkeletonCard />
          </>
        ) : (
          <>
            {jobs.length > 0 ? (
              jobs.map((job: any) => (
                <JobCard
                  title={job.job_title}
                  action={job.type || "Developer"}
                  description={job.job_description}
                  image={job.employer_logo}
                  salary={job.job_max_salary || "Not specified"}
                  location={job.job_city + ", " + job.job_country}
                  locationImage={job.job_country}
                  jobGoogleLink={job.job_google_link}
                  type={job.job_employment_type}
                />
              ))
            ) : (
              <>
                <NoResult
                  text="No Jobs to Show Right Now! 💼"
                  subtext="Don't be disheartened, try again later or search for jobs in another area by filling in a location and clicking on search jobs!🥤"
                  buttonText="Home"
                  buttonLink=""
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default JobPage;
