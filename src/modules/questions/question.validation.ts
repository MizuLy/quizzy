import { z } from "zod";

const optionSchema = z.string().trim().min(1).max(255);

export const questionSchema = z
  .object({
    text: z.string().trim().min(1).max(1000),
    answer: optionSchema,
    distractors: z.array(optionSchema).min(3).max(10),
  })
  .refine((q) => !q.distractors.includes(q.answer), {
    message: "distractors must not include the answer",
    path: ["distractors"],
  })
  .refine((q) => new Set(q.distractors).size === q.distractors.length, {
    message: "distractors must be unique",
    path: ["distractors"],
  });

export const answerSchema = z.object({
  answer: optionSchema,
});
