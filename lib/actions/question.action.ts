"use server";

import { databaseConnect } from "../mongoose";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsByTagIdParams,
  GetQuestionsParams,
  GetSavedQuestionsParams,
  QuestionVoteParams,
  ToggleSaveQuestionParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import { FilterQuery } from "mongoose";
import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    databaseConnect();

    const question = await Question.findById(params.questionId)
      .populate({ path: "tags", model: Tag })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture username",
      });

    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestions(params: GetQuestionsParams) {
  try {
    // connect to a database
    await databaseConnect();

    // get all the questions
    const questions = await Question.find({})
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .sort({ createdAt: -1 });
    return questions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getHotQuestions(params: GetQuestionsParams) {
  try {
    await databaseConnect();

    const { page, pageSize, searchQuery, filter } = params;

    const questions = await Question.find()
      .sort({ upvotes: -1, views: -1 })
      .limit(pageSize!);

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    // connect to a database
    await databaseConnect();

    // getting the parameters from the client side
    const { title, content, tags, author, path } = params;

    // cretae the question
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    // create tags or get them if the already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, "i") },
        },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },

        { upsert: true, new: true }
      ).exec();

      tagDocuments.push(existingTag._id);
    }

    // add the tags to the question
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // interaction on the question, increment author's reputation +5

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    // connect to a database
    databaseConnect();

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    console.log("questionId", questionId);

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found!");
    }

    revalidatePath(path);

    // increase the author's reputation by +10
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    databaseConnect();

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found!");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    databaseConnect();

    const { questionId, userId, path } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found!");
    }

    const isQuestionSaved = user.saved.includes(questionId);

    if (!isQuestionSaved) {
      await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { saved: questionId },
        },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        {
          $pull: { saved: questionId },
        },
        { new: true }
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestion(params: GetSavedQuestionsParams) {
  try {
    databaseConnect();
    const { clerkId, page, pageSize, filter, searchQuery } = params;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        {
          path: "author",
          model: User,
          select: "_id clerkId name picture username",
        },
      ],
    });

    if (!user) throw new Error("User not found!");

    const savedQuestions = user.saved;

    return { questions: savedQuestions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionByTagId(params: GetQuestionsByTagIdParams) {
  try {
    await databaseConnect();
    const { tagId, searchQuery, filter, pageSize } = params;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    // getting the tag and populating the questions field

    const tag = await Tag.findById(tagId).populate({
      path: "questions",
      model: Question,
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        {
          path: "author",
          model: User,
          select: "_id clerkId username picture name",
        },
        {
          path: "tags",
          model: Tag,
          select: "_id name",
        },
      ],
    });

    if (!tag) return console.log("Tag not found!");

    const questions = tag.questions;

    return { tagName: tag.name, questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteQuestion(params: DeleteQuestionParams) {
  try {
    await databaseConnect();
    const { questionId, path } = params;

    const deletedQuestion = await Question.findByIdAndDelete(questionId, {
      new: true,
    });

    if (!deletedQuestion) {
      throw new Error("Question not found!");
    }

    // deleted associated answers
    await Answer.deleteMany({ question: questionId });

    // delete all interactions
    await Interaction.deleteMany({ question: questionId });

    // update the tags
    await Tag.updateMany(
      { question: questionId },
      { $pull: { questions: questionId } }
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editQuestion(params: EditQuestionParams) {
  try {
    await databaseConnect();

    const { questionId, title, content, path } = params;

    const question = await Question.findById(questionId);

    if (!question) {
      throw new Error("Question not found!");
    }

    await Question.findByIdAndUpdate(question._id, { title, content });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
