"use server";

import Interaction from "@/database/interaction.model";
import Question from "@/database/question.model";
import { ViewQuestionParams } from "./shared.types";
import { databaseConnect } from "../mongoose";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await databaseConnect();

    const { questionId, userId } = params;

    // update view count for the question
    await Question.findByIdAndUpdate(
      questionId,
      { $inc: { views: 1 } },
      { new: true }
    );

    // if user Id exists check for an exisiting interaction with that question
    if (userId) {
      const exisitingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (exisitingInteraction)
        return console.log("User has already viewed this question!");

      // create view interaction
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
