import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../utils/AppError.js";

export const topicsService = {
  getAll: () => prisma.topic.findMany({ orderBy: { name: "asc" } }),

  getById: async (id: string) => {
    const topic = await prisma.topic.findUnique({ where: { id } });
    if (!topic) throw new AppError(404, "Topic not found");
    return topic;
  },

  create: (name: string) => prisma.topic.create({ data: { name } }),

  update: async (id: string, name: string) => {
    const topic = await prisma.topic.findUnique({ where: { id } });
    if (!topic) throw new AppError(404, "Topic not found");
    return prisma.topic.update({ where: { id }, data: { name } });
  },

  delete: async (id: string) => {
    const topic = await prisma.topic.findUnique({ where: { id } });
    if (!topic) throw new AppError(404, "Topic not found");
    return prisma.topic.delete({ where: { id } });
  },
};
