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

    const { page, pageSize, searchQuery, filter } = params;

    // search query
    const query: FilterQuery<typeof Question> = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
      ];
    }

    // filter option
    let sortOptions = {};

    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "reccomended":
        sortOptions = { upvotes: -1 };
        break;
      case "frequent":
        sortOptions = { views: -1 };
        break;
      case "unanswered":
        query.answers = { $size: 0 };
        break;
    }

    // get all the questions
    const questions = await Question.find(query)
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .skip((page! - 1) * pageSize!)
      .limit(pageSize!)
      .sort(sortOptions);

    // total question documents
    const totalQuestions = await Question.countDocuments(query);

    // questions left?

    const isNext = totalQuestions > questions.length + (page! - 1) * pageSize!;

    return { questions, isNext };
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

    await Interaction.create({
      user: author,
      question: question._id,
      action: "ask_question",
      tags: tagDocuments,
    });

    //  increment author's reputation +5
    await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } });

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

    // update the upvoter's reputation by 1
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasupVoted ? -1 : 1 },
    });

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found!");
    }

    revalidatePath(path);

    // increase the author's reputation by +10
    await User.findByIdAndUpdate(question.author._id, {
      $inc: { reputation: hasupVoted ? -10 : 10 },
    });
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

    // update the downvoter's reputation by 1
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasdownVoted ? 1 : -1 },
    });

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found!");
    }

    await User.findByIdAndUpdate(question.author._id, {
      $inc: { reputation: hasdownVoted ? 10 : -10 },
    });

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
      ? {
          $or: [
            { title: { $regex: new RegExp(searchQuery, "i") } },
            { content: { $regex: new RegExp(searchQuery, "i") } },
          ],
        }
      : {};

    const skipAmount = (page! - 1) * pageSize!;

    // filter option
    let sortOptions = {};

    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "reccomended":
        sortOptions = { upvotes: -1 };
        break;
      case "frequent":
        sortOptions = { views: -1 };
        break;
      case "unanswered":
        query.answers = { $size: 0 };
        break;
    }

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: sortOptions,
        limit: pageSize!,
        skip: skipAmount,
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

    // anymore questions?
    const totalQuestions = savedQuestions.length;

    const isNext = totalQuestions > pageSize! + skipAmount;

    return { questions: savedQuestions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionByTagId(params: GetQuestionsByTagIdParams) {
  try {
    await databaseConnect();
    const { tagId, searchQuery, filter, pageSize, page } = params;

    const query: FilterQuery<typeof Question> = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery || "", $options: "i" } },
        { content: { $regex: searchQuery || "", $options: "i" } },
      ];
    }

    const skipAmount = (page! - 1) * pageSize!;

    // getting the tag and populating the questions field

    const tag = await Tag.findById(tagId).populate({
      path: "questions",
      model: Question,
      match: query,
      options: {
        sort: { createdAt: -1 },
        limit: pageSize!,
        skip: skipAmount,
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

    // anymore questions?
    const totalQuestions = questions.length;
    const isNext = totalQuestions > pageSize! + skipAmount;

    return { tagName: tag.name, questions, isNext };
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
