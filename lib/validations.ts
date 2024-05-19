import { z } from "zod";

export const QuestionSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(100),
  // Tags should be an array of strings, with each string having a length between 1 and 45 characters.
  // The array should have at least 1 element and at most 3 elements.
  tags: z.array(z.string().min(1).max(45)).min(1).max(3),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100),
});
