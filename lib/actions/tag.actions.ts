"use server";

import User from "@/database/user.model";
import { databaseConnect } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    databaseConnect();

    const { userId, limit = 3 } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    // find the interaction for the user and groups by tags
    return [{ tagName: "HTML" }, { tagName: "REACT" }, { tagName: "CSS" }];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
