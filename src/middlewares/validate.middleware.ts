import type { RequestHandler, RequestParamHandler } from "express";
import { z } from "zod";

const uuidSchema = z.uuid();

export const validate =
  (schema: z.ZodType): RequestHandler =>
  (req, _res, next) => {
    req.body = schema.parse(req.body);
    next();
  };

// use with router.param("id", validateUuidParam) so every route with that param is checked
export const validateUuidParam: RequestParamHandler = (_req, _res, next, value, name) => {
  const result = uuidSchema.safeParse(value);
  if (!result.success) throw new z.ZodError([{ ...result.error.issues[0]!, path: [name] }]);
  next();
};
