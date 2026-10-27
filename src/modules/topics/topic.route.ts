import { Router } from "express";
import { topicsController } from "./topic.controller.js";

const router = Router();

router.get("/", topicsController.getAll);
router.get("/:id", topicsController.getById);
router.post("/", topicsController.create);
router.put("/:id", topicsController.update);
router.delete("/:id", topicsController.delete);

export default router;
