"use server";

import { databaseConnect } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    databaseConnect();
    const { author, question, content, path } = params;

    const answer = await Answer.create({
      author,
      question,
      content,
    });

    // add the answer to the respective question model

    await Question.findByIdAndUpdate(question, {
      $push: { answers: answer._id },
    });

    revalidatePath(path);

    // todo: add interaction to increase user reputation
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    databaseConnect();
    const { questionId, sortBy, page, pageSize } = params;

    // sort filter query
    let sortQuery = {};

    switch (sortBy) {
      case "highest upvotes":
        sortQuery = { upvotes: -1 };
        break;
      case "lowest upvotes":
        sortQuery = { upvotes: 1 };
        break;
      case "most recent":
        sortQuery = { createdAt: -1 };
        break;
      case "oldest":
        sortQuery = { createdAt: 1 };
        break;
    }

    const answers = await Answer.find({ question: questionId })
      .populate({
        path: "author",
        model: "User",
        select: "_id clerkId name picture",
      })
      .sort(sortQuery);

    return answers;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    databaseConnect();

    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

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

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found!");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    databaseConnect();

    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

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

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found!");
    }

    revalidatePath(path);

    // todo: increase the user reputation by +10
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    await databaseConnect();

    const { answerId, path } = params;

    const answer = await Answer.findById(answerId);

    const deletedAnswer = await Answer.findByIdAndDelete(answerId, {
      new: true,
    });

    if (!deletedAnswer) throw new Error("Answer not found!");

    // update questions by pulling the deleted answer from the answer list
    await Question.updateMany(
      { question: answer.question },
      { $pull: { answers: answerId } }
    );

    // delete all interactions
    await Interaction.deleteMany({ answer: answerId });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
