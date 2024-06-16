"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Image from "next/image";
import imgSrc from "../../../public/assets/icons/location.svg";
import { useSearchParams, useRouter } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

const JobFilter = () => {
  const [countries, setCountries] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const paramLocation = searchParams.get("location");

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/countries`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCountries((prev) => data.countries);
      }
    };

    fetchCountries();
  }, []);

  const handleTypeClick = (item: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "location",
      value: item.toLowerCase(),
    });

    router.push(newUrl, { scroll: false });
  };

  const capitalize = (item: any) => {
    return item[0].toUpperCase() + item.slice(1);
  };

  return (
    <>
      <div className={`relative flex w-full md:w-1/2`}>
        <Select
          defaultValue={paramLocation || undefined}
          onValueChange={handleTypeClick}
        >
          <SelectTrigger
            className={`min-h-[56px] min-w-[170px] body-regular light-border background-light800_darkgradient text-light-400 border px-5 py-2.5 no-focus focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent`}
          >
            <div className="line-clamp-1 flex-1 text-left flex items-center gap-1">
              <Image
                src={imgSrc}
                alt="location icon"
                width={24}
                height={24}
                className="invert-colors"
              />
              <SelectValue placeholder="Select location" />
            </div>
          </SelectTrigger>
          <SelectContent className="text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300">
            <SelectGroup>
              {countries.map((country: any, index) => {
                return (
                  <>
                    <SelectItem
                      key={country.name.common + index + country.capital}
                      value={country.name.common}
                    >
                      {country.name.common} {country.flag}
                    </SelectItem>
                  </>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default JobFilter;
