"use server";

import { databaseConnect } from "../mongoose";
import User from "@/database/user.model";
import {
  CreateUserParams,
  UpdateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetUserByIdParams,
  GetUserStatsParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";
import Tag from "@/database/tag.model";
import { FilterQuery } from "mongoose";

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    await databaseConnect();

    const { page, pageSize, searchQuery, filter } = params;

    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: searchQuery, $options: "i" } },
        { username: { $regex: searchQuery, $options: "i" } },
      ];
    }

    let sortOptions = {};

    // filter sorting query
    switch (filter) {
      case "new users":
        sortOptions = { joinedAt: -1 };
        break;
      case "old users":
        sortOptions = {
          joinedAt: 1,
        };
        break;
      case "top contributors":
        // sort according to the total reputation
        sortOptions = { reputation: -1 };
        break;
    }

    const users = await User.find(query).sort(sortOptions);
    return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserById(params: GetUserByIdParams) {
  try {
    await databaseConnect();

    const { userId } = params;

    console.log(userId);

    const user = await User.findOne({ clerkId: userId });

    console.log(user);

    if (!user) {
      throw new Error("User not found!");
    }

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    await databaseConnect();

    const { userId, page, pageSize } = params;

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found!");

    // total questions
    const totalQuestions = await Question.countDocuments({ author: user._id });

    // find the questions whose author is the user

    const questions = await Question.find({ author: user._id })
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .sort({ views: -1, upvotes: -1 })
      .skip(page! > 0 ? (page! - 1) * pageSize! : 0)
      .limit(pageSize!);

    return { totalQuestions, questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    await databaseConnect();

    const { userId, page, pageSize } = params;

    // get the user by userId
    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found!");

    // count the total question documents
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    // get the user answers
    const userAnswers = await Answer.find({ author: user._id })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      })
      .populate({
        path: "question",
        model: Question,
        select: "_id title",
      })
      .sort({ upvotes: -1 })
      .skip(page! > 0 ? (page! - 1) * pageSize! : 0)
      .limit(pageSize!);

    return { totalAnswers, answers: userAnswers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    await databaseConnect();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("User not found");
    }

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    return {
      user,
      totalQuestions,
      totalAnswers,
    };
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
