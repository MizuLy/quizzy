import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/AppError.js";

type QuestionInput = {
  text: string;
  answer: string;
  distractors: string[];
  topicId: string;
};

const shuffle = <T>(items: T[]): T[] => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j]!, result[i]!];
  }
  return result;
};

export const questionsService = {
  getAll: () => prisma.question.findMany(),

  getAllByTopic: async (topicId: string) => {
    const topic = await prisma.topic.findUnique({ where: { id: topicId } });
    if (!topic) throw new AppError(404, "Topic not found");
    return prisma.question.findMany({ where: { topicId } });
  },

  getById: async (id: string) => {
    const question = await prisma.question.findUnique({ where: { id } });
    if (!question) throw new AppError(404, "Question not found");
    return question;
  },

  create: async (input: QuestionInput) => {
    const topic = await prisma.topic.findUnique({ where: { id: input.topicId } });
    if (!topic) throw new AppError(404, "Topic not found");
    return prisma.question.create({ data: input });
  },

  update: async (id: string, input: Omit<QuestionInput, "topicId">) => {
    const question = await prisma.question.findUnique({ where: { id } });
    if (!question) throw new AppError(404, "Question not found");

    return prisma.question.update({ where: { id }, data: input });
  },

  delete: async (id: string) => {
    const question = await prisma.question.findUnique({ where: { id } });
    if (!question) throw new AppError(404, "Question not found");
    return prisma.question.delete({ where: { id } });
  },

  // PLAYER SERVICES
  play: async (topicId: string) => {
    const topic = await prisma.topic.findUnique({ where: { id: topicId } });
    if (!topic) throw new AppError(404, "Topic not found");

    const questions = await prisma.question.findMany({ where: { topicId } });
    return questions.map(({ id, text, answer, distractors }) => ({
      id,
      text,
      options: shuffle([answer, ...distractors]),
    }));
  },

  answer: async (id: string, answer: string) => {
    const question = await prisma.question.findUnique({ where: { id } });
    if (!question) throw new AppError(404, "Question not found");
    return { correct: answer === question.answer, answer: question.answer };
  },
};
