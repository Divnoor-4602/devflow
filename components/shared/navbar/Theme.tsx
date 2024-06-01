"use client";

import React from "react";
import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";
import { themes } from "@/constants";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import sunIcon from "../../../public/assets/icons/sun.svg";
import moonIcon from "../../../public/assets/icons/moon.svg";

const Theme = () => {
  const { mode, setMode } = useTheme();

  return (
    <>
      <div className="z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent"
            >
              {mode === "light" ? (
                <Image
                  src={sunIcon}
                  alt="sun icon"
                  height={20}
                  width={20}
                  className="active-theme"
                />
              ) : (
                <Image
                  src={moonIcon}
                  alt="moon icon"
                  height={20}
                  width={20}
                  className="active-theme"
                />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            className="absolute -right-12 mt-2 min-w-[120px] space-y-2 rounded border bg-light-900 dark:border-dark-400 dark:bg-dark-300"
          >
            {/* mapping over theme constants */}
            {themes.map((item) => {
              return (
                <>
                  <DropdownMenuItem
                    key={item.value}
                    onClick={() => {
                      setMode(item.value);

                      if (item.value !== "system") {
                        localStorage.theme = item.value;
                      } else {
                        localStorage.removeItem("theme");
                      }
                    }}
                    className="text-dark100_light900 flex items-center justify-start gap-2"
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={20}
                      height={20}
                      className={`${mode === item.value ? "active-theme" : ""}`}
                    />{" "}
                    {item.label}
                  </DropdownMenuItem>
                </>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default Theme;
