import { Router } from "express";
import { topicsController } from "./topic.controller.js";
import { topicSchema } from "./topic.validation.js";
import { validate, validateUuidParam } from "../../middlewares/validate.middleware.js";

const router = Router();

router.param("id", validateUuidParam);

router.get("/", topicsController.getAll);
router.get("/:id", topicsController.getById);
router.post("/", validate(topicSchema), topicsController.create);
router.put("/:id", validate(topicSchema), topicsController.update);
router.delete("/:id", topicsController.delete);

export default router;
