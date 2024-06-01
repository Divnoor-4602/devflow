"use server";

import User from "@/database/user.model";
import Tag from "@/database/tag.model";
import { databaseConnect } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import { FilterQuery } from "mongoose";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    databaseConnect();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    // find the interaction for the user and groups by tags
    return [{ tagName: "HTML" }, { tagName: "REACT" }, { tagName: "CSS" }];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    databaseConnect();

    const { page, filter, pageSize, searchQuery } = params;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [
        {
          name: { $regex: searchQuery, $options: "i" },
        },
      ];
    }

    // sort options
    let sortOptions = {};

    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
    }

    const tags = await Tag.find(query).sort(sortOptions);
    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopPopularTags(params: GetAllTagsParams) {
  try {
    await databaseConnect();

    const popularTags = await Tag.aggregate([
      {
        $project: { name: 1, numberOfQuestions: { $size: "$questions" } },
      },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);

    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
