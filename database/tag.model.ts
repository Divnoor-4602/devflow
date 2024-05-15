import { Schema, models, model, Document } from "mongoose";

export interface ITag extends Document {
  name: string;
  description: string;
  createdAt: Date;
  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
}

// creating a user schema
const tagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

// creating a user model
const Tag = models.Tag || model("Tag", tagSchema);

export default Tag;
