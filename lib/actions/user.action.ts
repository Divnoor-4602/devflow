"use server";

import { databaseConnect } from "../mongoose";
import User from "@/database/user.model";
import {
  CreateUserParams,
  UpdateUserParams,
  DeleteUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

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

export async function createUser(userData: CreateUserParams) {
  databaseConnect();

  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    const { clerkId } = params;

    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // If the user is deleted, delete all questions comments answers

    // get user question ids
    const userQuestionsId = await Question.find({
      author: user._id,
    }).distinct("_id");

    // delete all the questions
    await Question.deleteMany({ author: user._id });

    // todo: delete all answers, for that we will require userQuestionIds

    const deletedUser = await User.findByIdAndDelete({ clerkId });

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
