import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError.js";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    res.status(err.status).json({ error: err.message });
    return;
  }
  if (err instanceof ZodError) {
    const issue = err.issues[0]!;
    const path = issue.path.join(".");
    res.status(400).json({ error: path ? `${path}: ${issue.message}` : issue.message });
    return;
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
};
