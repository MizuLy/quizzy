import { Router } from "express";
import { questionsController } from "./question.controller.js";
import { questionSchema, answerSchema } from "./question.validation.js";
import { validate, validateUuidParam } from "../../middlewares/validate.middleware.js";

const router = Router();

router.param("id", validateUuidParam);
router.param("topicId", validateUuidParam);

router.get("/", questionsController.getAll);

router.get("/t/:topicId/q", questionsController.getAllByTopic);
router.post("/t/:topicId/q", validate(questionSchema), questionsController.create);

router.get("/t/:topicId/play", questionsController.play);
router.post("/:id/answer", validate(answerSchema), questionsController.answer);

router.get("/:id", questionsController.getById);
router.put("/:id", validate(questionSchema), questionsController.update);
router.delete("/:id", questionsController.delete);

export default router;
