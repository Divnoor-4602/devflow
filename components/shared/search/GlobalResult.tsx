"use client";

import React, { useState, useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GlobalFilters from "./GlobalFilters";
import { getGlobalData } from "@/lib/actions/global.action";

const GlobalResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);

  const searchParams = useSearchParams();
  const global = searchParams.get("global");
  const type = searchParams.get("type");

  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);
      setIsLoading(true);
      try {
        // Global Search
        const res = await getGlobalData({
          searchQuery: global,
          filter: type,
        });

        setResult((prev) => JSON.parse(res));
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    if (global) {
      fetchResult();
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "question":
        return `/question/${id}`;
      case "answer":
        return `/answer/${id}`;
      case "user":
        return `/profile/${id}`;
      case "tag":
        return `/tags/${id}`;
      default:
        return `/`;
    }
  };

  console.log(result);

  return (
    <>
      <div className="background-light800_dark400 shadow-light100_darknone absolute top-16  max-h-[700px] w-full max-w-[600px] overflow-y-auto rounded-lg pb-6 max-lg:hidden">
        {/* type */}
        <GlobalFilters />
        {/* menu logs */}
        <div className="">
          <div className="paragraph-semibold text-dark400_light800 px-5 pt-5">
            Top Match
          </div>
          {isLoading ? (
            <>
              <div className="flex-center flex-col px-5">
                <ReloadIcon className="my-2 size-10 animate-spin text-primary-500" />
                <p className="text-dark200_light800 body-regular">
                  Browsing the entire database
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="mt-3 flex flex-col gap-1 ">
                {result.length > 0 ? (
                  result.map((item: any, index: number) => {
                    return (
                      <>
                        <Link
                          href={renderLink(item.type, item.id)}
                          key={item.type + item.id + index}
                          className="flex cursor-pointer items-start gap-3 rounded-lg p-3 px-5 transition duration-200 hover:bg-light-700/50 hover:dark:bg-dark-500/50"
                        >
                          <Image
                            src="/assets/icons/tag.svg"
                            alt="tags"
                            width={18}
                            height={18}
                            className="invert-colors mt-1 object-contain"
                          />
                          <div className="flex flex-col gap-1">
                            <div className="body-medium text-dark200_light900 line-clamp-1">
                              {item.title}
                            </div>
                            <div className="small-medium font-bold capitalize text-light-500">
                              {item.type}
                            </div>
                          </div>
                        </Link>
                      </>
                    );
                  })
                ) : (
                  <>
                    <div className="flex-center flex-col px-5">
                      <div className="text-4xl">🫣</div>
                      <p className="text-dark200_light800 body-regular px-5 py-2.5">
                        Oops, no results found!
                      </p>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GlobalResult;
