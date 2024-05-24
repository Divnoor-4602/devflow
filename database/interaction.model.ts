import { Schema, models, model, Document } from "mongoose";

export interface IInteraction extends Document {
  user: Schema.Types.ObjectId;
  action: string;
  question: Schema.Types.ObjectId; // reference to questions
  answer: Schema.Types.ObjectId; // reference to answers
  tags: Schema.Types.ObjectId[]; // reference to tags
  createdAt: Date;
}

// creating a interaction schema
const interactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  answers: { type: Schema.Types.ObjectId, ref: "Answer" },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  createdAt: { type: Date, default: Date.now },
});

// creating an interaction model
const Interaction =
  models.Interaction || model("Interaction", interactionSchema);

export default Interaction;
