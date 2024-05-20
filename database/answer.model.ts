import { Schema, models, model, Document } from "mongoose";

export interface IAnswer extends Document {
  author: Schema.Types.ObjectId;
  content: string;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  question: Schema.Types.ObjectId;
  createdAt: Date;
}

// creating answer schema
const answerSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  createdAt: { type: Date, default: Date.now() },
});

// creating an amswer model
const Answer = models.Answer || model("Answer", answerSchema);

export default Answer;
