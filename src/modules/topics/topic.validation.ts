import { z } from "zod";

export const topicSchema = z.object({
  name: z.string().trim().min(1).max(100),
});
