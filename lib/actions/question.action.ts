"use server";

import { databaseConnect } from "../mongoose";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";

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
      });

    return questions;
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
        { $setOnInsert: { name: tag }, $push: { question: question._id } },

        { upsert: true, new: true }
      ).exec();

      tagDocuments.push(existingTag._id);
    }

    // add the tags to the question
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // interaction on the question, increment author's reputation +5
  } catch (error) {}
}