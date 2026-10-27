import type { Request, Response } from "express";
import { topicsService } from "./topic.service.js";
import { AppError } from "../../utils/AppError.js";

export const topicsController = {
  getAll: async (req: Request, res: Response) => {
    res.json(await topicsService.getAll());
  },

  getById: async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    res.status(200).json(await topicsService.getById(id));
  },

  create: async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) throw new AppError(400, "name is required");
    res.status(201).json(await topicsService.create(name));
  },

  update: async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) throw new AppError(400, "name is required");
    res.status(200).json(await topicsService.update(id, name));
  },

  delete: async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    res.status(200).json(await topicsService.delete(id));
  },
};
