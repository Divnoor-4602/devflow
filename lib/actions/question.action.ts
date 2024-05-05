"use server";

import { databaseConnect } from "../mongoose";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";

export async function createQuestion(params: any) {
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
      const existingTag = Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, "i") },
        },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },

        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    // add the tags to the question
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // interaction on the question, increment author's reputation +5
  } catch (error) {}
}
