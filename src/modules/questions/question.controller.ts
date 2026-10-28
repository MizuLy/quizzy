import type { Request, Response } from "express";
import { questionsService } from "./question.service.js";

export const questionsController = {
  getAll: async (_req: Request, res: Response) => {
    res.json(await questionsService.getAll());
  },

  getAllByTopic: async (req: Request<{ topicId: string }>, res: Response) => {
    const { topicId } = req.params;
    res.status(200).json(await questionsService.getAllByTopic(topicId));
  },

  getById: async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    res.status(200).json(await questionsService.getById(id));
  },

  create: async (req: Request<{ topicId: string }>, res: Response) => {
    const { topicId } = req.params;
    const { text, answer, distractors } = req.body;
    res.status(201).json(await questionsService.create({ text, answer, distractors, topicId }));
  },

  update: async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { text, answer, distractors } = req.body;
    res.status(200).json(await questionsService.update(id, { text, answer, distractors }));
  },

  delete: async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    res.status(200).json(await questionsService.delete(id));
  },

  // PLAYER CONTROLLERS
  play: async (req: Request<{ topicId: string }>, res: Response) => {
    const { topicId } = req.params;
    res.status(200).json(await questionsService.play(topicId));
  },

  answer: async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { answer } = req.body;
    res.status(200).json(await questionsService.answer(id, answer));
  },
};
