"use server";

import Question from "@/database/question.model";

import { databaseConnect } from "../mongoose";
import { getGlobalDataParams } from "./shared.types";

import Answer from "@/database/answer.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";

const SearchableTypes = ["question", "answer", "user", "tag"];

export async function getGlobalData(params: getGlobalDataParams) {
  try {
    await databaseConnect();

    const { filter, searchQuery } = params;

    const regexQuery = { $regex: searchQuery, $options: "i" };

    let results = [];

    const modelAndTypes = [
      { model: Question, searchField: "title", type: "question" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: User, searchField: "name", type: "user" },
      { model: Tag, searchField: "name", type: "tag" },
    ];

    const typeLower = filter?.toLowerCase();

    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      // SEARCH ACROSS EVERYWHERE

      for (const { model, searchField, type } of modelAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResults.map((item) => ({
            title:
              type === "answer"
                ? `Answers containing ${searchQuery}`
                : item[searchField],
            type,
            id:
              type === "user"
                ? item.clerkId
                : typeLower === "answer"
                ? item.question
                : item.id,
          }))
        );
      }

      return JSON.stringify(results);
    } else {
      // SEARCH IN SPECIFIED MODEL AND TYPE
      console.log("searching in specified model");
      const modelInfo = modelAndTypes.find((item) => item.type === typeLower);
      if (!modelInfo) {
        throw new Error("invalid search type!");
      }

      const queryResults = await modelInfo.model
        .find({ [modelInfo.searchField]: regexQuery })
        .limit(8);

      results = queryResults.map((item) => ({
        title:
          typeLower === "answer"
            ? `Answers containing ${searchQuery}`
            : item[modelInfo.searchField],
        type: typeLower,
        id:
          typeLower === "user"
            ? item.clerkId
            : filter === "answer"
            ? item.question
            : item._id,
      }));

      return JSON.stringify(results);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
