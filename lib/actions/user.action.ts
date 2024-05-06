"use server";

import { databaseConnect } from "../mongoose";
import User from "@/database/user.model";

export async function getUserById(params: any) {
  try {
    await databaseConnect();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
