import { Router } from "express";
import topicRoutes from "./modules/topics/topic.route.js";
import questionRoutes from "./modules/questions/question.route.js";

const router = Router();

router.use("/topics", topicRoutes);
router.use("/questions", questionRoutes);

export default router;
